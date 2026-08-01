param(
    [string]$OutputPath = "data/dpwh-projects.json",
    [int]$PageSize = 50,
    [int]$MaxAttempts = 10
)

$ErrorActionPreference = "Stop"
$apiBase = "https://api.transparency.dpwh.gov.ph/projects"
$endpoint = $apiBase + "?page=1&limit=$PageSize&region=Region%20I&province=LA%20UNION"
$userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36"
$allProjects = [System.Collections.Generic.List[object]]::new()
$pageReports = [System.Collections.Generic.List[object]]::new()
$totalPages = 1
$expectedTotal = $null

for ($page = 1; $page -le $totalPages; $page++) {
    $uri = $apiBase + "?page=$page&limit=$PageSize&region=Region%20I&province=LA%20UNION"
    $response = $null

    for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
        $body = curl.exe -sS --max-time 60 -A $userAgent -H "Accept: application/json,text/plain,*/*" $uri
        if ($LASTEXITCODE -eq 0 -and $body -match '^\s*\{') {
            try {
                $candidate = $body | ConvertFrom-Json
                if ($candidate.code -eq "SUCCESS") {
                    $response = $candidate
                    break
                }
            }
            catch {
                $response = $null
            }
        }
        Start-Sleep -Milliseconds (500 * $attempt)
    }

    if ($null -eq $response) {
        throw "Official DPWH API page $page failed after $MaxAttempts attempts."
    }

    if ($page -eq 1) {
        $totalPages = [int]$response.data.pagination.totalPages
        $expectedTotal = [int]$response.data.pagination.totalCount
    }
    elseif ([int]$response.data.pagination.totalCount -ne $expectedTotal) {
        throw "The API total changed during pagination; rerun the sync for a consistent snapshot."
    }

    foreach ($project in $response.data.data) {
        $allProjects.Add($project)
    }
    $pageReports.Add([ordered]@{
        page = $page
        records = $response.data.data.Count
        attempts = $attempt
    })
}

$uniqueProjects = @($allProjects | Group-Object contractId | ForEach-Object { $_.Group[0] })
if ($allProjects.Count -ne $expectedTotal -or $uniqueProjects.Count -ne $expectedTotal) {
    throw "Pagination audit failed: expected $expectedTotal unique contracts, received $($allProjects.Count) records and $($uniqueProjects.Count) unique IDs."
}

$agooProjects = @(
    $uniqueProjects |
        Where-Object {
            $_.description -match '(?i)\bAgoo\b' -and
            $_.location.province -eq "La Union 2nd DEO" -and
            $_.location.region -eq "Region I"
        } |
        Sort-Object @{ Expression = { [int]$_.infraYear }; Descending = $true }, contractId
)

$projects = @(
    $agooProjects | ForEach-Object {
        [pscustomobject][ordered]@{
            contractId = $_.contractId
            name = $_.description
            category = $_.category
            componentCategories = $_.componentCategories
            status = $_.status
            approvedBudget = $_.budget
            amountPaid = $_.amountPaid
            progress = $_.progress
            office = $_.location.province
            region = $_.location.region
            contractor = $_.contractor
            startDate = $_.startDate
            completionDate = $_.completionDate
            year = [string]$_.infraYear
            programName = $_.programName
            sourceOfFunds = $_.sourceOfFunds
            latitude = $_.latitude
            longitude = $_.longitude
            id = $_.contractId
            location = "Agoo, La Union"
            contractCost = $null
        }
    }
)

$statusCounts = [ordered]@{}
foreach ($group in ($projects | Group-Object status | Sort-Object Name)) {
    $statusCounts[$group.Name] = $group.Count
}
$years = @($projects | ForEach-Object { [int]$_.year })
$retryPages = @($pageReports | Where-Object { $_.attempts -gt 1 }).Count
$retrievalDate = Get-Date -Format "yyyy-MM-dd"

$dataset = [ordered]@{
    _schemaVersion = "2.1"
    _status = "official-api-snapshot"
    metadata = [ordered]@{
        officialApiEndpoint = $endpoint
        officialPortal = "https://transparency.dpwh.gov.ph/"
        officialApiRetrievedAt = $retrievalDate
        officialApiResult = "Success (HTTP 200)"
        pagesRetrieved = $pageReports.Count
        pageSize = $PageSize
        sourceRecordCount = $expectedTotal
        uniqueSourceContractCount = $uniqueProjects.Count
        pagesRequiringRetry = $retryPages
        filteredAt = $retrievalDate
        filter = "Whole-word, case-insensitive 'Agoo' in description; Region I; La Union 2nd DEO"
        limitations = "Official API snapshot retrieved across every reported page. The API does not expose a separate contract-cost field; contractCost remains null. Zero-budget procurement entries preserve the API's published values."
    }
    summary = [ordered]@{
        totalProjects = $projects.Count
        totalApprovedBudget = [math]::Round(($projects | Measure-Object approvedBudget -Sum).Sum, 2)
        totalAmountPaid = [math]::Round(($projects | Measure-Object amountPaid -Sum).Sum, 2)
        statusCounts = $statusCounts
        yearRange = @(
            [string](($years | Measure-Object -Minimum).Minimum),
            [string](($years | Measure-Object -Maximum).Maximum)
        )
        implementingOffice = "La Union 2nd DEO"
    }
    projects = $projects
}

$json = $dataset | ConvertTo-Json -Depth 10
$resolvedOutput = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputPath))
$utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($resolvedOutput, $json + [Environment]::NewLine, $utf8WithoutBom)

Write-Output "Retrieved $expectedTotal unique contracts across $totalPages pages."
Write-Output "Published $($projects.Count) verified Agoo matches to $OutputPath."
