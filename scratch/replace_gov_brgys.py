# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = r"C:\github\betteragoo"
GOV_INDEX_HTML = os.path.join(BASE_DIR, "government", "index.html")

AGOO_BARANGAYS_LIST = [
    "Ambitacay", "Balawarte", "Capas", "Consolacion", "Macalva Central",
    "Macalva Norte", "Macalva Sur", "Purok", "San Agustin East", "San Agustin West",
    "San Antonio", "San Francisco", "San Isidro", "San Joaquin Norte", "San Joaquin Sur",
    "San Jose Central", "San Jose Norte", "San Jose Sur", "San Juan", "San Julian Central",
    "San Julian East", "San Julian Norte", "San Julian Sur", "San Julian West", "San Manuel Norte",
    "San Manuel Sur", "San Marcos", "San Miguel", "San Nicolas East", "San Nicolas West",
    "San Pedro", "San Roque East", "San Roque West", "San Vicente Norte", "San Vicente Sur",
    "Santa Ana", "Santa Barbara", "Santa Cruz", "Santa Fe", "Santa Maria",
    "Santa Monica", "Santa Rita Central", "Santa Rita East", "Santa Rita Norte", "Santa Rita Sur",
    "Santa Rita West", "Santa Teresita", "Santo Tomas", "Taytay"
]

def main():
    with open(GOV_INDEX_HTML, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # Build Agoo cards list
    cards_html = '          <div class="grid grid-4" style="gap: var(--spacing-sm)">\n'
    for name in AGOO_BARANGAYS_LIST:
        slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
        cards_html += f"""            <a href="#" class="barangay-card">
              <div class="barangay-card-header">
                <i class="bi bi-geo-alt-fill"></i>
                <span class="barangay-name" data-i18n="gov-brgy-{slug}">{name}</span>
              </div>
              <div class="barangay-card-body">
                <span class="barangay-captain" data-i18n="gov-kap-tba">Kap. TBA</span>
                <span class="barangay-contact"><i class="bi bi-telephone"></i> TBA</span>
              </div>
            </a>\n"""
    cards_html += '          </div>'
    
    # We want to replace from '<div class="grid grid-4" style="gap: var(--spacing-sm)">' 
    # that is immediately after '<!-- Barangays Grid -->' up to its matching closing '</div>'
    start_token = '<!-- Barangays Grid -->'
    idx_comment = content.find(start_token)
    if idx_comment == -1:
        print("Error: Could not find comment <!-- Barangays Grid -->")
        return
        
    idx_grid_start = content.find('<div class="grid grid-4" style="gap: var(--spacing-sm)">', idx_comment)
    if idx_grid_start == -1:
        print("Error: Could not find grid div")
        return
        
    # We need to find the matching closing div. Let's count divs to be 100% correct.
    idx_pos = idx_grid_start + len('<div class="grid grid-4" style="gap: var(--spacing-sm)">')
    div_depth = 1
    
    while div_depth > 0 and idx_pos < len(content):
        next_open = content.find('<div', idx_pos)
        next_close = content.find('</div>', idx_pos)
        
        if next_close == -1:
            print("Error: Unbalanced divs")
            return
            
        if next_open != -1 and next_open < next_close:
            div_depth += 1
            idx_pos = next_open + 4
        else:
            div_depth -= 1
            idx_pos = next_close + 6
            
    end_pos = idx_pos # This is the index after the matching </div>
    
    # Reconstruct content
    new_content = content[:idx_grid_start] + cards_html + content[end_pos:]
    
    # Also replace count description from 22 to 49
    new_content = new_content.replace(
        '<p data-i18n="gov-barangays-count" style="color: var(--color-text-light)">\n              22 Barangays serving our community\n            </p>',
        '<p data-i18n="gov-barangays-count" style="color: var(--color-text-light)">\n              49 Barangays serving our community\n            </p>'
    )
    
    with open(GOV_INDEX_HTML, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced Solano barangay cards list with Agoo 49 cards grid.")

if __name__ == "__main__":
    main()
