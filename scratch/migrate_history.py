# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = r"C:\github\betteragoo"
INDEX_HTML = os.path.join(BASE_DIR, "index.html")
TRANSLATIONS_JS = os.path.join(BASE_DIR, "assets", "js", "translations.js")
LANG_CONTEXT = os.path.join(BASE_DIR, "react-app", "src", "contexts", "LanguageContext.tsx")

# New Agoo timeline HTML
agoo_timeline_html = """            <div class="history-timeline">
              <div class="timeline-item" data-year="1578">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <span class="timeline-year">1578</span>
                  <p data-i18n="home-history-1578">
                    Agoo was founded as a settlement by Franciscan friars, Father John Baptist Lucarelli and Father Sebastian de Baeza, and dedicated to Santa Monica.
                  </p>
                </div>
              </div>
              <div class="timeline-item" data-year="1582">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <span class="timeline-year">1582</span>
                  <p data-i18n="home-history-1582">
                    Administered by Augustinian missionaries who named the town Agoo, after the "aroo" or pine-like Casuarina trees lining the coast.
                  </p>
                </div>
              </div>
              <div class="timeline-item" data-year="1500s">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <span class="timeline-year">1500s</span>
                  <p data-i18n="home-history-precolonial">
                    Known as "Puerto de Japón," Agoo was a bustling pre-colonial international port trading with Japanese, Chinese, and Ryukyuan merchants.
                  </p>
                </div>
              </div>
              <div class="timeline-item" data-year="1850">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <span class="timeline-year">1850</span>
                  <p data-i18n="home-history-1850">
                    Agoo was integrated into the newly created province of La Union, signed into law by Governor-General Antonio Maria Blanco.
                  </p>
                </div>
              </div>
              <div class="timeline-item" data-year="1978">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <span class="timeline-year">1978</span>
                  <p data-i18n="home-history-1978">
                    Marking its 400th founding anniversary, the parish church was elevated to a Basilica Minore (Our Lady of Charity) by Pope John Paul II.
                  </p>
                </div>
              </div>
              <div class="timeline-item" data-year="Present">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <span class="timeline-year">Present</span>
                  <p data-i18n="home-history-present">
                    Agoo thrives as a key educational and cultural center in La Union, celebrating its heritage through the annual Dinengdeng Festival.
                  </p>
                </div>
              </div>
            </div>"""

agoo_summary_cards_html = """            <div class="history-summary">
              <div class="history-card">
                <div class="history-card-icon"><i class="bi bi-geo-alt-fill"></i></div>
                <div class="history-card-content">
                  <h4 data-i18n="home-basilica-town">The Basilica Town</h4>
                  <p data-i18n="home-basilica-town-desc">
                    Agoo is one of the oldest settlements in the region, home to the Basilica Minore of Our Lady of Charity.
                  </p>
                </div>
              </div>
              <div class="history-card">
                <div class="history-card-icon"><i class="bi bi-shop"></i></div>
                <div class="history-card-content">
                  <h4 data-i18n="home-puerto-de-japon">Puerto de Japón</h4>
                  <p data-i18n="home-puerto-de-japon-desc">
                    Before Spanish colonizers closed the port, Agoo was a bustling center of trade for Japanese, Chinese, and Ryukyuan merchants.
                  </p>
                </div>
              </div>
            </div>"""

def migrate_index_html():
    if not os.path.exists(INDEX_HTML):
        return
    with open(INDEX_HTML, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # Replace history-timeline block
    pattern_timeline = re.compile(r'<div class="history-timeline">.*?</div>\s*</div>', re.DOTALL)
    content_modified = pattern_timeline.sub(agoo_timeline_html, content, 1)
    
    # Replace history-summary block
    pattern_summary = re.compile(r'<div class="history-summary">.*?</div>\s*</div>\s*</div>', re.DOTALL)
    content_modified = pattern_summary.sub(agoo_summary_cards_html, content_modified, 1)
    
    with open(INDEX_HTML, 'w', encoding='utf-8') as f:
        f.write(content_modified)
    print("Migrated history timeline and summary sections in index.html.")

def migrate_translations_js():
    if not os.path.exists(TRANSLATIONS_JS):
        return
    with open(TRANSLATIONS_JS, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # We will replace the block of history keys for EN, TL, and ILO
    # Let's define the new blocks
    en_new = """    'home-history-1578': 'Agoo was founded as a settlement by Franciscan friars, Father John Baptist Lucarelli and Father Sebastian de Baeza, and dedicated to Santa Monica.',
    'home-history-1582': 'Administered by Augustinian missionaries who named the town Agoo, after the "aroo" or pine-like Casuarina trees lining the coast.',
    'home-history-precolonial': 'Known as "Puerto de Japón," Agoo was a bustling pre-colonial international port trading with Japanese, Chinese, and Ryukyuan merchants.',
    'home-history-1850': 'Agoo was integrated into the newly created province of La Union, signed into law by Governor-General Antonio Maria Blanco.',
    'home-history-1978': 'Marking its 400th founding anniversary, the parish church was elevated to a Basilica Minore (Our Lady of Charity) by Pope John Paul II.',
    'home-history-present': 'Agoo thrives as a key educational and cultural center in La Union, celebrating its heritage through the annual Dinengdeng Festival.',
    'home-basilica-town': 'The Basilica Town',
    'home-basilica-town-desc': 'Agoo is one of the oldest settlements in the region, home to the Basilica Minore of Our Lady of Charity.',
    'home-puerto-de-japon': 'Puerto de Japón',
    'home-puerto-de-japon-desc': 'Before Spanish colonizers closed the port, Agoo was a bustling center of trade for Japanese, Chinese, and Ryukyuan merchants.',"""

    tl_new = """    'home-history-1578': 'Itinatag ang Agoo bilang isang pamayanan ng mga paring Pransiskano na sina Padre John Baptist Lucarelli at Padre Sebastian de Baeza, at inialay kay Santa Monica.',
    'home-history-1582': 'Pinamahalaan ng mga misyonerong Agustino na nagpangalan sa bayan bilang Agoo, mula sa "aroo" o mga mala-pain na puno ng Casuarina sa baybayin.',
    'home-history-precolonial': 'Kilala bilang "Puerto de Japón," ang Agoo ay isang masiglang daungang pandaigdig bago ang kolonisasyon na nakikipagkalakalan sa mga Hapones, Tsino, at Ryukyuan.',
    'home-history-1850': 'Isinama ang Agoo sa bagong tatag na lalawigan ng La Union, na nilagdaan ni Gobernador-Heneral Antonio Maria Blanco.',
    'home-history-1978': 'Sa ika-400 taong anibersaryo ng pagkakatatag nito, ang parokya ay itinaas bilang Basilica Minore ng Nuestra Señora de Caridad ni Papa Juan Pablo II.',
    'home-history-present': 'Patuloy na umuunlad ang Agoo bilang sentro ng edukasyon at kultura sa La Union, at ipinagdiriwang ang pamana nito sa pamamagitan ng taunang Dinengdeng Festival.',
    'home-basilica-town': 'Ang Bayan ng Basilica',
    'home-basilica-town-desc': 'Ang Agoo ay isa sa mga pinakalumang pamayanan sa rehiyon, tahanan ng Basilica Minore ng Nuestra Señora de Caridad.',
    'home-puerto-de-japon': 'Puerto de Japón',
    'home-puerto-de-japon-desc': 'Bago isinara ng mga Kastila ang daungan, ang Agoo ay naging abalang sentro ng kalakalan para sa mga Hapones, Tsino, at Ryukyuan.',"""

    ilo_new = """    'home-history-1578': 'Naipasdek ti Agoo kas maysa a pagtaengan babaen kadagiti pader a Pransiskano a da Padre John Baptist Lucarelli ken Padre Sebastian de Baeza, ken naidaton ken Santa Monica.',
    'home-history-1582': 'Inurnos dagiti misionero nga Agustino a nangipanagan iti ili kas Agoo, manipud iti "aroo" wenno kasla pino a kaykayo a Casuarina iti igid ti baybay.',
    'home-history-precolonial': 'Naam-ammo kas "Puerto de Japón," ti Agoo ket maysa a nabiag nga internasional a puerto sakbay ti kolonisasion a nakilinnako kadagiti Hapon, Tsino, ken Ryukyuan.',
    'home-history-1850': 'Nairaman ti Agoo iti baro a naipasdek a probinsia ti La Union, a pinirmaan ni Gobernador-Heneral Antonio Blanco.',
    'home-history-1978': 'Iti maika-400 nga anibersario ti pannakapasdekna, ti simbaan ti parokia ket naitan-ok kas Basilica Minore ti Nuestra Señora de Caridad babaen ken Papa Juan Pablo II.',
    'home-history-present': 'Rumang-ay ti Agoo kas kangrunaan a sentro ti edukasion ken kultura iti La Union, a mangrambak iti tawidna babaen ti tinawen a Dinengdeng Festival.',
    'home-basilica-town': 'Ti Ili ti Basilica',
    'home-basilica-town-desc': 'Ti Agoo ket maysa kadagiti kabakangan a pagtaengan iti rehion, a pagtaengan ti Basilica Minore ti Nuestra Señora de Caridad.',
    'home-puerto-de-japon': 'Puerto de Japón',
    'home-puerto-de-japon-desc': 'Sakbay a nangrikep dagiti Kastila iti puerto, ti Agoo ket maysa a masiblag a sentro ti komersio para kadagiti Hapon, Tsino, ken Ryukyuan.',"""

    # We want to remove all keys matching home-history-xxxx, home-once-the-largest, home-agoo-was-the-largest, home-urban-planning, home-the-1889-redevelopment
    pattern_removals = [
        r"\s*'home-history-1760':.*?\n",
        r"\s*'home-history-1767':.*?\n",
        r"\s*'home-history-1768':.*?\n",
        r"\s*'home-governor-general-antonio-urbiztondo-declared':.*?\n",
        r"\s*'home-history-1853':.*?\n",
        r"\s*'home-history-1889':.*?\n",
        r"\s*'home-history-1957':.*?\n",
        r"\s*'home-once-the-largest':.*?\n",
        r"\s*'home-agoo-was-the-largest-municipality-in-the':.*?\n",
        r"\s*'home-urban-planning':.*?\n",
        r"\s*'home-the-1889-redevelopment-created-a-grid-of-100':.*?\n",
    ]
    
    modified = content
    for pat in pattern_removals:
        modified = re.sub(pat, "", modified)
        
    # Now insert the new keys in the English, Tagalog, and Ilocano blocks.
    # EN block target: insert under 'home-brief-history-of-agoo'
    modified = modified.replace(
        "'home-brief-history-of-agoo': 'Brief History of Agoo',",
        "'home-brief-history-of-agoo': 'Brief History of Agoo',\n" + en_new
    )
    # TL block target: insert under 'home-brief-history-of-agoo'
    modified = modified.replace(
        "'home-brief-history-of-agoo': 'Maikling Kasaysayan ng Agoo',",
        "'home-brief-history-of-agoo': 'Maikling Kasaysayan ng Agoo',\n" + tl_new
    )
    # ILO block target: insert under 'home-brief-history-of-agoo'
    modified = modified.replace(
        "'home-brief-history-of-agoo': 'Pabassit a Pakasaritaan ti Agoo',",
        "'home-brief-history-of-agoo': 'Pabassit a Pakasaritaan ti Agoo',\n" + ilo_new
    )
    
    with open(TRANSLATIONS_JS, 'w', encoding='utf-8') as f:
        f.write(modified)
    print("Updated translations.js with Agoo history keys.")

def migrate_language_context():
    if not os.path.exists(LANG_CONTEXT):
        return
    with open(LANG_CONTEXT, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # We want to replace standard history keys
    en_react = """    'history-1578':
      'Agoo was founded as a settlement by Franciscan friars, Father John Baptist Lucarelli and Father Sebastian de Baeza, and dedicated to Santa Monica.',
    'history-1582':
      'Administered by Augustinian missionaries who named the town Agoo, after the "aroo" or pine-like Casuarina trees lining the coast.',
    'history-precolonial':
      'Known as "Puerto de Japón," Agoo was a bustling pre-colonial international port trading with Japanese, Chinese, and Ryukyuan merchants.',
    'history-1850':
      'Agoo was integrated into the newly created province of La Union, signed into law by Governor-General Antonio Maria Blanco.',
    'history-1978':
      'Marking its 400th founding anniversary, the parish church was elevated to a Basilica Minore (Our Lady of Charity) by Pope John Paul II.',
    'history-present':
      'Agoo thrives as a key educational and cultural center in La Union, celebrating its heritage through the annual Dinengdeng Festival.',
    'history-basilica-town-title': 'The Basilica Town',
    'history-basilica-town-desc':
      'Agoo is one of the oldest settlements in the region, home to the Basilica Minore of Our Lady of Charity.',
    'history-puerto-de-japon-title': 'Puerto de Japón',
    'history-puerto-de-japon-desc':
      'Before Spanish colonizers closed the port, Agoo was a bustling center of trade for Japanese, Chinese, and Ryukyuan merchants.',"""

    tl_react = """    'history-1578':
      'Itinatag ang Agoo bilang isang pamayanan ng mga paring Pransiskano na sina Padre John Baptist Lucarelli at Padre Sebastian de Baeza, at inialay kay Santa Monica.',
    'history-1582':
      'Pinamahalaan ng mga misyonerong Agustino na nagpangalan sa bayan bilang Agoo, mula sa "aroo" o mga mala-pain na puno ng Casuarina sa baybayin.',
    'history-precolonial':
      'Kilala bilang "Puerto de Japón," ang Agoo ay isang masiglang daungang pandaigdig bago ang kolonisasyon na nakikipagkalakalan sa mga Hapones, Tsino, at Ryukyuan.',
    'history-1850':
      'Isinama ang Agoo sa bagong tatag na lalawigan ng La Union, na nilagdaan ni Gobernador-Heneral Antonio Maria Blanco.',
    'history-1978':
      'Sa ika-400 taong anibersaryo ng pagkakatatag nito, ang parokya ay itinaas bilang Basilica Minore ng Nuestra Señora de Caridad ni Papa Juan Pablo II.',
    'history-present':
      'Patuloy na umuunlad ang Agoo bilang sentro ng edukasyon at kultura sa La Union, at ipinagdiriwang ang pamana nito sa pamamagitan ng taunang Dinengdeng Festival.',
    'history-basilica-town-title': 'Ang Bayan ng Basilica',
    'history-basilica-town-desc':
      'Ang Agoo ay isa sa mga pinakalumang pamayanan sa rehiyon, tahanan ng Basilica Minore ng Nuestra Señora de Caridad.',
    'history-puerto-de-japon-title': 'Puerto de Japón',
    'history-puerto-de-japon-desc':
      'Bago isinara ng mga Kastila ang daungan, ang Agoo ay naging abalang sentro ng kalakalan para sa mga Hapones, Tsino, at Ryukyuan.',"""

    ilo_react = """    'history-1578':
      'Naipasdek ti Agoo kas maysa a pagtaengan babaen kadagiti pader a Pransiskano a da Padre John Baptist Lucarelli ken Padre Sebastian de Baeza, ken naidaton ken Santa Monica.',
    'history-1582':
      'Inurnos dagiti misionero nga Agustino a nangipanagan iti ili kas Agoo, manipud iti "aroo" wenno kasla pino a kaykayo a Casuarina iti igid ti baybay.',
    'history-precolonial':
      'Naam-ammo kas "Puerto de Japón," ti Agoo ket maysa a nabiag nga internasional a puerto sakbay ti kolonisasion a nakilinnako kadagiti Hapon, Tsino, ken Ryukyuan.',
    'history-1850':
      'Nairaman ti Agoo iti baro a naipasdek a probinsia ti La Union, a pinirmaan ni Gobernador-Heneral Antonio Blanco.',
    'history-1978':
      'Iti maika-400 nga anibersario ti pannakapasdekna, ti simbaan ti parokia ket naitan-ok kas Basilica Minore ti Nuestra Señora de Caridad babaen ken Papa Juan Pablo II.',
    'history-present':
      'Rumang-ay ti Agoo kas kangrunaan a sentro ti edukasion ken kultura iti La Union, a mangrambak iti tawidna babaen ti tinawen a Dinengdeng Festival.',
    'history-basilica-town-title': 'Ti Ili ti Basilica',
    'history-basilica-town-desc':
      'Ti Agoo ket maysa kadagiti kabakangan a pagtaengan iti rehion, a pagtaengan ti Basilica Minore ti Nuestra Señora de Caridad.',
    'history-puerto-de-japon-title': 'Puerto de Japón',
    'history-puerto-de-japon-desc':
      'Sakbay a nangrikep dagiti Kastila iti puerto, ti Agoo ket maysa a masiblag a sentro ti komersio para kadagiti Hapon, Tsino, ken Ryukyuan.',"""

    # We want to remove all keys matching history-xxxx, history-once-largest-xxxx, history-urban-planning-xxxx
    pattern_removals = [
        r"\s*'history-1760':.*?\n\s*'.*?',",
        r"\s*'history-1767':.*?\n\s*'.*?',",
        r"\s*'history-1768':.*?\n\s*'.*?',",
        r"\s*'history-1851':.*?\n\s*'.*?',",
        r"\s*'history-1853':.*?\n\s*'.*?',",
        r"\s*'history-1889':.*?\n\s*'.*?',",
        r"\s*'history-1957':.*?\n\s*'.*?',",
        r"\s*'history-once-largest-title':.*?\n\s*'.*?',",
        r"\s*'history-once-largest-desc':.*?\n\s*'.*?',",
        r"\s*'history-urban-planning-title':.*?\n\s*'.*?',",
        r"\s*'history-urban-planning-desc':.*?\n\s*'.*?',",
    ]
    
    modified = content
    # Remove old keys
    # Let's target the exact text range from 'history-title' up to 'news-announcement' for safer replacement
    # We will look for the English, Tagalog, and Ilocano history block exactly
    
    # EN Block
    start_en = modified.find("'history-title': 'Brief History of Agoo',")
    end_en = modified.find("'news-announcement': 'Announcement',", start_en)
    if start_en != -1 and end_en != -1:
        new_block_en = "'history-title': 'Brief History of Agoo',\n" + en_react + "\n"
        modified = modified[:start_en] + new_block_en + modified[end_en:]
        
    # Tagalog Block
    start_tl = modified.find("'history-title': 'Maikling Kasaysayan ng Agoo',")
    end_tl = modified.find("'news-announcement': 'Anunsyo',", start_tl)
    if start_tl != -1 and end_tl != -1:
        new_block_tl = "'history-title': 'Maikling Kasaysayan ng Agoo',\n" + tl_react + "\n"
        modified = modified[:start_tl] + new_block_tl + modified[end_tl:]
        
    # Ilocano Block
    start_ilo = modified.find("'history-title': 'Pabassit a Pakasaritaan ti Agoo',")
    end_ilo = modified.find("'news-announcement': 'Pakaammo',", start_ilo)
    if start_ilo != -1 and end_ilo != -1:
        new_block_ilo = "'history-title': 'Pabassit a Pakasaritaan ti Agoo',\n" + ilo_react + "\n"
        modified = modified[:start_ilo] + new_block_ilo + modified[end_ilo:]
        
    with open(LANG_CONTEXT, 'w', encoding='utf-8') as f:
        f.write(modified)
    print("Updated LanguageContext.tsx with Agoo history keys.")

def main():
    print("Migrating Solano historical narratives and timelines to Agoo...")
    migrate_index_html()
    migrate_translations_js()
    migrate_language_context()

if __name__ == "__main__":
    main()
