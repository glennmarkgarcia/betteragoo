# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = r"C:\github\betteragoo"
GOV_INDEX_HTML = os.path.join(BASE_DIR, "government", "index.html")

def update_officials_html():
    with open(GOV_INDEX_HTML, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # Replace Mayor card contacts
    content = content.replace(
        '<a href="tel:0783265002"><i class="bi bi-telephone"></i> (078) 326-5002</a>',
        '<a href="tel:TBA"><i class="bi bi-telephone"></i> TBA</a>'
    )
    
    # Replace Vice Mayor card contacts
    content = content.replace(
        '<a href="tel:0783265003"><i class="bi bi-telephone"></i> (078) 326-5003</a>',
        '<a href="tel:TBA"><i class="bi bi-telephone"></i> TBA</a>'
    )
    
    # Rebuild councilors grid with 8 + 2 ex-officio cards as TBA
    councilors_html = """<!-- Councilors Grid -->
          <div class="grid grid-3" style="gap: var(--spacing-md)">
            <div class="councilor-card">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-1">
                Hon. TBA
              </h4>
              <span class="councilor-badge" data-i18n="gov-sb-member">SB Member</span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
            <div class="councilor-card">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-2">
                Hon. TBA
              </h4>
              <span class="councilor-badge" data-i18n="gov-sb-member">SB Member</span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
            <div class="councilor-card">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-3">
                Hon. TBA
              </h4>
              <span class="councilor-badge" data-i18n="gov-sb-member">SB Member</span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
            <div class="councilor-card">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-4">
                Hon. TBA
              </h4>
              <span class="councilor-badge" data-i18n="gov-sb-member">SB Member</span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
            <div class="councilor-card">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-5">
                Hon. TBA
              </h4>
              <span class="councilor-badge" data-i18n="gov-sb-member">SB Member</span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
            <div class="councilor-card">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-6">
                Hon. TBA
              </h4>
              <span class="councilor-badge" data-i18n="gov-sb-member">SB Member</span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
            <div class="councilor-card">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-7">
                Hon. TBA
              </h4>
              <span class="councilor-badge" data-i18n="gov-sb-member">SB Member</span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
            <div class="councilor-card">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-8">
                Hon. TBA
              </h4>
              <span class="councilor-badge" data-i18n="gov-sb-member">SB Member</span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
            <div class="councilor-card councilor-card--liga">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-abc">
                Hon. TBA
              </h4>
              <span class="councilor-badge councilor-badge--liga" data-i18n="gov-liga-ng-mga-barangay-president">
                Liga ng mga Barangay President
              </span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
            <div class="councilor-card councilor-card--sk">
              <h4 class="councilor-name" data-i18n="gov-hon-councilor-sk">
                Hon. TBA
              </h4>
              <span class="councilor-badge councilor-badge--sk" data-i18n="gov-sk-federation-president">
                SK Federation President
              </span>
              <p class="councilor-committees" data-i18n="gov-committee-tba">
                TBA
              </p>
            </div>
          </div>"""
          
    pattern = re.compile(r'<!-- Councilors Grid -->.*?</div>\s*</div>\s*</section>', re.DOTALL)
    
    # Locate exact grid start and end
    start_idx = content.find('<!-- Councilors Grid -->')
    end_idx = content.find('<!-- Department Heads -->') if start_idx != -1 else -1
    
    # Let's verify we cut before the offices header
    if start_idx != -1 and end_idx != -1:
        # Find closing tag of the councilors list
        # The block ends before the offices section
        idx_grid_end = content.rfind('</div>', start_idx, end_idx)
        # Find the next closing div which closes the container section
        idx_container_end = content.find('</div>', idx_grid_end + 6, end_idx)
        idx_section_end = content.find('</section>', idx_container_end + 6, end_idx)
        
        if idx_section_end != -1:
            end_pos = idx_section_end + len('</section>')
            new_content = content[:start_idx] + councilors_html + "\n      </section>" + content[end_pos:]
            with open(GOV_INDEX_HTML, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Successfully updated Sangguniang Bayan councilors cards list to TBA in government/index.html.")
        else:
             print("Error: Could not locate end of section tag for councilors in government/index.html")
    else:
        print("Error: Could not locate Sangguniang Bayan councilors block in government/index.html")

if __name__ == "__main__":
    update_officials_html()
