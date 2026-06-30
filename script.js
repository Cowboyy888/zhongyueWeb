/* ============================================
   中粤铁网公司 — Premium Interactive JS
   Three.js mesh background + GSAP + Lenis
   ============================================ */

/* ══════════════════════════════════
   BILINGUAL TRANSLATION SYSTEM
══════════════════════════════════ */
var i18nData = {
  zh: {
    'topbar-addr': 'CJJG+HHH, Khum Trapeang Kong, Cambodia',
    'topbar-hours': '每天：08:00 – 17:00',
    'topbar-cta': '免费询价',
    'nav-home': '首页', 'nav-about': '关于我们', 'nav-facility': '工厂实景',
    'nav-products': '产品中心', 'nav-process': '生产工艺', 'nav-factory': '设备展示',
    'nav-delivery': '物流配送', 'nav-why': '优势', 'nav-contact': '联系我们',
    'nav-why-long': '我们的优势', 'nav-cta': '免费询价',
    'hero-badge': '专业钢筋网制造商 · Since 2002',
    'hero-h1': '铸就<em>钢铁</em><br/>品质<em>恒久</em>',
    'hero-tagline': '铸造力量，塑造未来',
    'hero-desc': '中粤铁网公司深耕钢铁行业逾10年，精密生产焊接钢筋网，服务全球60余个国家。',
    'hero-btn-products': '查看产品', 'hero-btn-process': '了解工艺', 'hero-btn-contact': '联系我们',
    'feat-1-title': '高品质产品', 'feat-1-desc': 'ISO 9001认证，每批附随完整质检报告',
    'feat-2-title': '先进技术', 'feat-2-desc': '全自动焊网生产线，日产能超800吨',
    'feat-3-title': '值得信赖的伙伴', 'feat-3-desc': '10年深耕行业，服务全球60余个国家',
    'feat-4-title': '可持续发展', 'feat-4-desc': '绿色生产工艺，符合国际环保标准',
    'meta-years': '年行业经验', 'meta-cap': '日产能（吨）', 'meta-countries': '出口国家', 'meta-retention': '客户留存率',
    'spec-custom-val': '定制规格', 'spec-strength-val': '高强度',
    'tick-1': '焊接钢筋网', 'tick-2': '高强度碳素钢', 'tick-3': '定制规格加工', 'tick-4': '全球60+国家直发', 'tick-5': '99%准时履约',
    'tl-tag': '生产工艺', 'tl-title': '从<em>原料</em>到<em>成品</em>',
    'tl-lead': '七道精密工序，全程质量追溯，确保每批产品达到最高标准',
    'step-1': '原材料', 'step-1-sub': 'Steel Wire Rod',
    'step-2': '调直切断', 'step-2-sub': 'Wire Straightening',
    'step-3': '自动焊接', 'step-3-sub': 'Auto Welding',
    'step-4': '剪裁成型', 'step-4-sub': 'Cutting &amp; Forming',
    'step-5': '质量检验', 'step-5-sub': 'QC Inspection',
    'step-6': '包装入库', 'step-6-sub': 'Packaging',
    'step-7': '出厂交付', 'step-7-sub': 'Global Delivery',
    'about-tag': '关于中粤铁网', 'about-title': '品质<em>铸就</em><br/>信赖',
    'about-badge-text': '年专业<br/>经验',
    'about-year-label': 'Founded · 成立年份',
    'about-live-label': '生产中 · Live Production',
    'about-lead': '自2002年成立以来，中粤铁网公司专注焊接钢筋网研发与生产，以全自动焊接工艺、精密切断系统与严格质控流程，成为柬埔寨具有影响力的钢筋网制品供应商。',
    'about-f1-title': 'ISO 9001:2015 质量认证',
    'about-f1-desc': '每批产品附随焊点抗拉强度、丝径公差、网格精度等全项检测报告，附质保书与材质证明。',
    'about-f2-title': '全自动高速生产线',
    'about-f2-desc': '引进国际先进自动焊网机，精度±0.5mm，三班倒全天候运营，日产能超800吨。',
    'about-f3-title': '全球供应与物流',
    'about-f3-desc': '通过广州港、深圳港直发全球60余个国家，提供报关、货运、保险一站式服务。',
    'fac-eyebrow-text': '实地工厂',
    'fac-subtitle': '中粤钢铁 · 实力工厂',
    'fac-desc': '坐落于柬埔寨工业园区，占地超26,000㎡的现代化钢铁生产基地。<br/>全封闭厂区、智能安防、ISO认证车间——我们的每一批产品都诞生于此。',
    'fstat-1': '总占地面积', 'fstat-2-unit': '条', 'fstat-2': '全自动生产线',
    'fstat-3-unit': '吨/日', 'fstat-3': '最大日产能', 'fstat-4': '9001 品质认证',
    'fac-cta-text': '参观工厂 · Book a Visit',
    'partners-label': '合作客户与战略伙伴',
    'products-tag': '产品中心', 'products-title': '五大<em>核心产品</em>',
    'products-lead': '所有产品均附随出厂质量证书，支持定制规格、线径及网格间距，满足国标、欧标、美标等多种标准要求。',
    'p1-num-label': '主推产品', 'p1-cat': '焊接网片', 'p1-name': '焊接钢筋网<br/>/ 建筑网片',
    'p1-desc': '适用于楼板、墙体、路面铺设的标准焊接钢筋网。线径4–12mm，网格间距100–200mm，单张尺寸最大6×2.4m，可定尺切割。',
    'p2-cat': '地台网', 'p2-name': '楼板钢筋网',
    'p2-desc': '专为现浇混凝土楼板设计，线径6–10mm，间距150mm，替代手工绑扎，大幅提升施工效率并保证钢筋间距均匀。',
    'p3-cat': '围栏网片', 'p3-name': '焊接围栏网',
    'p3-desc': '用于工地围栏、仓库分隔及安全防护的重型焊接网片。线径3–6mm，网格50–100mm，表面可镀锌或粉末涂层处理。',
    'p4-cat': '定制产品', 'p4-name': '异型钢筋网',
    'p4-desc': '按客户图纸定制的异形网片，支持L形、T形、弧形等特殊截面，适用于桥墩、隧道衬砌等复杂结构配筋。',
    'p5-cat': '原材料', 'p5-name': '冷拔钢丝 / 盘条',
    'p5-desc': '高强度冷拔钢丝及热轧盘条，直径3–12mm，适用于自动焊网机直接投料，也可散装供货，满足不同规模需求。',
    'p-quote': '立即询价 <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    'factory-tag': '实力工厂', 'factory-title': '先进设备<em>精密制造</em>',
    'factory-lead': '全自动焊网生产线 · 冷拔钢丝设备 · 智能质检系统<br/>年产能超过20万吨，满足国内外大型工程需求。',
    'factory-feature-img-label': '全自动多点焊网机 · 48焊头同步作业',
    'factory-feature-tag': '核心设备', 'factory-feature-title': '全自动<br/><em>焊网生产线</em>',
    'factory-feature-desc': '采用最新一代全自动多点焊网机，48个焊接头同步作业，单台设备每小时可产出标准网片60张。气液增压系统保证每个焊点压力精确一致，焊接强度达GB/T标准。',
    'fl-1-label': '焊接效率', 'fl-1-val': '60张/小时（标准2.4×6m网片）',
    'fl-2-label': '焊点压力', 'fl-2-val': '气液增压，±2% 精度控制',
    'fl-3-label': '可调间距', 'fl-4-label': '适配线径',
    'fc1-overlay': '气液增压焊头', 'fc1-title': '精密焊接头阵列', 'fc1-desc': '48路独立气液增压焊接头，确保每个交叉点焊接质量统一。',
    'fc2-overlay': '全自动送料系统', 'fc2-title': '横向送料 · 精密定位', 'fc2-desc': '伺服驱动横向筋自动送料，定位误差小于±0.5mm。',
    'fc3-overlay': '冷拔调直生产线', 'fc3-title': '冷拔调直 · 纵筋生产', 'fc3-desc': '8台冷拔调直机联排运行，全程自动输送至焊网机入料端。',
    'fc4-overlay': '自动放线系统', 'fc4-title': '盘条自动放线架', 'fc4-desc': '大容量放线架承重可达3吨，配合张力控制装置保证均匀供料。',
    'fc5-overlay': '中粤铁网 · 厂区全景', 'fc5-title': '26,000㎡ 现代化厂房',
    'fc5-desc': '配备10吨桥式行车，完整冷拔→调直→焊网→切割→检验→入库一体化智能产线，日产能可达800吨。',
    'fact-1': '日产能（吨）', 'fact-2': '出口国家', 'fact-3': '专业员工', 'fact-4': '行业奖项',
    'why-tag': '为什么选择我们', 'why-title': '中粤铁网<em>六大优势</em>',
    'why-lead': '全球顶尖工程师和承包商选择中粤铁网的六个核心理由。',
    'why-1-title': '出厂质量证书', 'why-1-desc': '每批附随焊点抗拉强度、丝径公差、网格精度等检测报告，全程可追溯。',
    'why-2-title': '准时交货', 'why-2-desc': '99%的按期履约率，自有车队配合港口战略合作，常规订单15个工作日内发货。',
    'why-3-title': '定制规格服务', 'why-3-desc': '支持按图纸定制线径、间距及网片尺寸，厂内技术工程师全程支持。',
    'why-4-title': '出厂直供价格', 'why-4-desc': '去除中间商，直厂报价更具竞争力。批量采购客户可享额外优惠。',
    'why-5-title': '全球供货能力', 'why-5-desc': '4大洲设有合作仓库，专职外贸团队，可提供FOB、CIF等多种贸易条款。',
    'why-6-title': '7×24 技术支持', 'why-6-desc': '专属客户经理及结构工程师全天候在线，提供选型建议及现场技术咨询。',
    'testi-tag': '客户评价', 'testi-title': '合作<em>客户说</em>',
    'testi-1-text': '中粤铁网的钢筋网焊点强度和尺寸公差完全符合设计要求，交货周期仅12天，配套的质检报告齐全，我方监理验收一次通过。',
    'testi-1-name': '李建明 / 采购总监',
    'testi-2-text': '两年前将楼板网配筋全线切换为中粤铁网供货，相比现场手工绑扎，施工效率提升40%，成本下降18%，质量更有保证。',
    'testi-2-name': '陈晓芳 / 供应链经理',
    'testi-3-text': '隧道衬砌所用异型钢筋网按图纸定制，中粤技术团队全程配合，精度达到设计要求，后续将持续合作。',
    'testi-3-name': '王海涛 / 设备工程师',
    'del-label': '准时交货', 'del-title': '高效物流 · <span>直达工地</span>',
    'del-desc': '从车间到工地，全程跟踪配送。我们的重型货车车队可覆盖华南及全国各地，确保钢筋网产品安全准时到达。',
    'del-badge-1': '批量发货', 'del-card-1-title': '整车发运 · 满载出库',
    'del-card-1-desc': '大吨位平板车满载钢筋网面板，单车可运输 20–30 吨产品',
    'del-badge-2': '全国配送', 'del-card-2-title': '专业车队 · 全程跟踪',
    'del-card-2-desc': '覆盖柬埔寨及周边各省市工地，准时交付有保障',
    'del-stat-1-unit': '小时内', 'del-stat-1-label': '下单后发货时效',
    'del-stat-2-unit': '吨/车', 'del-stat-2-label': '单次最大装载量',
    'del-stat-3-unit': '+省份', 'del-stat-3-label': '全国配送覆盖',
    'del-stat-4-label': '货损赔付保障',
    'cta-title': '准备好采购<br/>优质钢筋网？',
    'cta-desc': '24小时内提供附随质检报告的正式报价单。',
    'cta-btn': '立即获取报价',
    'contact-tag': '联系我们', 'contact-title': '商务<em>洽谈</em>',
    'contact-desc': '无论您需要即期报价、长期供货协议还是技术选型支持，我们的专业团队将在一个工作日内给予回复。',
    'contact-addr-label': '工厂地址', 'contact-addr': 'CJJG+HHH, Khum Trapeang Kong, Cambodia',
    'contact-map-btn': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg> 查看地图',
    'contact-phone-label': '销售热线', 'contact-email-label': '电子邮件',
    'form-title': '发送询价', 'form-name': '姓名', 'form-company': '公司名称',
    'form-company-ph': '贵公司名称', 'form-email': '电子邮件', 'form-phone': '联系电话',
    'form-product': '意向产品', 'form-product-default': '— 请选择产品 —',
    'form-opt-1': '焊接钢筋网 / 建筑网片', 'form-opt-2': '楼板钢筋网',
    'form-opt-3': '焊接围栏网', 'form-opt-4': '异型钢筋网（定制）',
    'form-opt-5': '冷拔钢丝 / 盘条', 'form-opt-6': '多种产品 / 综合询价',
    'form-detail': '询价详情 &amp; 规格要求',
    'form-detail-ph': '请填写线径、间距、网片尺寸、数量及交货地点……',
    'form-submit': '提交询价 / Send Inquiry',
    'footer-about': '专注焊接钢筋网研发、生产与销售，服务建筑、基础设施及工业领域，出口60余个国家，2002年成立至今始终如一。',
    'footer-col-1': '产品中心', 'footer-col-2': '公司信息', 'footer-col-3': '订阅资讯',
    'footer-newsletter-desc': '订阅电子报，获取最新价格行情、新品发布及行业动态。',
    'footer-email-ph': '您的邮箱地址',
    'footer-cert': '质量认证',
    'footer-copy': '© 2026 中粤铁网公司. 版权所有. | <a href="#">粤ICP备XXXXXXXX号</a>',
    'footer-privacy': '隐私政策', 'footer-terms': '使用条款', 'footer-cert-link': '质量证书',
    'page-title': '中粤铁网公司 — 专业钢筋网制造商 | Zhongyue Steel',
    'meta-desc': 'Zhongyue Steel — 专业焊接钢筋网制造商，ISO 9001认证，线径3–12mm，服务全球60余个国家，2002年成立。',
  },
  en: {
    'topbar-addr': 'CJJG+HHH, Khum Trapeang Kong, Cambodia',
    'topbar-hours': 'Everyday 8:00 - 17:00',
    'topbar-cta': 'Free Quote',
    'nav-home': 'Home', 'nav-about': 'About', 'nav-facility': 'Facility',
    'nav-products': 'Products', 'nav-process': 'Process', 'nav-factory': 'Equipment',
    'nav-delivery': 'Delivery', 'nav-why': 'Why Us', 'nav-contact': 'Contact',
    'nav-why-long': 'Our Advantages', 'nav-cta': 'Get a Quote',
    'hero-badge': 'Professional Steel Mesh Manufacturer · Since 2002',
    'hero-h1': 'Built for <em>Strength</em><br/>Made to <em>Last</em>',
    'hero-tagline': 'Building Strength. Shaping Tomorrow.',
    'hero-desc': 'Zhongyue Steel — 10+ years of precision steel mesh manufacturing. Serving 60+ countries worldwide.',
    'hero-btn-products': 'View Products', 'hero-btn-process': 'Our Process', 'hero-btn-contact': 'Contact Us',
    'feat-1-title': 'High Quality Products', 'feat-1-desc': 'ISO 9001 certified with full QC reports on every batch',
    'feat-2-title': 'Advanced Technology', 'feat-2-desc': 'Fully automated welding lines, 800+ tonnes daily capacity',
    'feat-3-title': 'Trusted Partner', 'feat-3-desc': '10+ years of industry expertise, serving 60+ countries',
    'feat-4-title': 'Sustainable Future', 'feat-4-desc': 'Green production processes meeting international standards',
    'meta-years': 'Yrs Experience', 'meta-cap': 'Daily Output (T)', 'meta-countries': 'Export Countries', 'meta-retention': 'Client Retention',
    'spec-custom-val': 'Custom Sizes', 'spec-strength-val': 'High Strength',
    'tick-1': 'Welded Rebar Mesh', 'tick-2': 'High-Strength Carbon Steel', 'tick-3': 'Custom Specifications', 'tick-4': 'Ships to 60+ Countries', 'tick-5': '99% On-Time Delivery',
    'tl-tag': 'Production Process', 'tl-title': 'From <em>Raw Wire</em> to <em>Finished Mesh</em>',
    'tl-lead': 'Seven precision steps with full quality traceability — ensuring every batch meets the highest standards',
    'step-1': 'Raw Material', 'step-1-sub': 'Steel Wire Rod',
    'step-2': 'Straightening', 'step-2-sub': 'Wire Straightening',
    'step-3': 'Auto Welding', 'step-3-sub': 'Auto Welding',
    'step-4': 'Cutting', 'step-4-sub': 'Cutting &amp; Forming',
    'step-5': 'QC Inspection', 'step-5-sub': 'QC Inspection',
    'step-6': 'Packaging', 'step-6-sub': 'Packaging',
    'step-7': 'Delivery', 'step-7-sub': 'Global Delivery',
    'about-tag': 'About Zhongyue Steel', 'about-title': 'Quality <em>Built</em><br/>to Last',
    'about-badge-text': 'Yrs of<br/>Expertise',
    'about-year-label': 'Founded · Est. Year',
    'about-live-label': 'Live Production',
    'about-lead': 'Founded in 2002, Zhongyue Steel has dedicated itself to the R&D and production of welded rebar mesh. With fully automated welding, precision cutting systems, and rigorous QC, we have become one of the most influential steel mesh suppliers in Cambodia.',
    'about-f1-title': 'ISO 9001:2015 Certified',
    'about-f1-desc': 'Every batch ships with a full test report covering weld tensile strength, wire diameter tolerance, and mesh spacing accuracy — plus a quality certificate and material certificate.',
    'about-f2-title': 'Fully Automated High-Speed Lines',
    'about-f2-desc': 'Advanced automatic mesh welding machines with ±0.5mm precision. Three-shift 24/7 operation delivers over 800 tonnes per day.',
    'about-f3-title': 'Global Supply & Logistics',
    'about-f3-desc': 'Direct shipping to 60+ countries via Guangzhou and Shenzhen ports, with one-stop customs, freight, and insurance services.',
    'fac-eyebrow-text': 'Our Facility · World-Class Factory',
    'fac-subtitle': 'Zhongyue Steel · World-Class Factory',
    'fac-desc': 'A modern steel production base covering over 26,000㎡ in Cambodia\'s industrial zone.<br/>Fully enclosed campus, smart security, ISO-certified workshops — every batch is born here.',
    'fstat-1': 'Total Area', 'fstat-2-unit': 'Lines', 'fstat-2': 'Auto Production Lines',
    'fstat-3-unit': 'T / Day', 'fstat-3': 'Max Daily Output', 'fstat-4': '9001 Certified',
    'fac-cta-text': 'Book a Factory Visit',
    'partners-label': 'Clients & Strategic Partners',
    'products-tag': 'Our Products', 'products-title': 'Five <em>Core Products</em>',
    'products-lead': 'All products ship with a factory quality certificate. Custom wire diameter, mesh spacing, and panel size to meet GB, EN, ASTM, and other standards.',
    'p1-num-label': 'Best Seller', 'p1-cat': 'Welded Mesh', 'p1-name': 'Welded Rebar Mesh<br/>/ Construction Panel',
    'p1-desc': 'Standard welded rebar mesh for floor slabs, walls, and road paving. Wire 4–12mm, spacing 100–200mm, max single panel 6×2.4m, custom cut-to-size.',
    'p2-cat': 'Floor Mesh', 'p2-name': 'Floor Slab Mesh',
    'p2-desc': 'Designed for cast-in-place concrete floor slabs. Wire 6–10mm, 150mm spacing. Replaces manual tying — dramatically improves efficiency and ensures uniform rebar spacing.',
    'p3-cat': 'Fence Mesh', 'p3-name': 'Welded Fence Mesh',
    'p3-desc': 'Heavy-duty welded panels for site fencing, warehouse partitions, and safety barriers. Wire 3–6mm, mesh 50–100mm. Galvanized or powder-coated finish available.',
    'p4-cat': 'Custom Products', 'p4-name': 'Custom-Shape Mesh',
    'p4-desc': 'Custom-shaped mesh panels per client drawings — L-shape, T-shape, curved and more. Ideal for bridge piers, tunnel lining, and complex structural reinforcement.',
    'p5-cat': 'Raw Material', 'p5-name': 'Cold-Drawn Wire / Rod',
    'p5-desc': 'High-strength cold-drawn wire and hot-rolled rod, diameter 3–12mm. Suitable for direct feed into automatic welders or available in bulk.',
    'p-quote': 'Get a Quote <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    'factory-tag': 'Our Factory', 'factory-title': 'Advanced Equipment, <em>Precision Made</em>',
    'factory-lead': 'Fully automated mesh welding lines · Cold-drawn wire equipment · Smart QC systems<br/>Annual capacity exceeds 200,000 tonnes for large-scale domestic and international projects.',
    'factory-feature-img-label': 'Auto Multi-Point Welder · 48 Heads Simultaneous',
    'factory-feature-tag': 'Core Equipment', 'factory-feature-title': 'Fully Automatic<br/><em>Mesh Production Line</em>',
    'factory-feature-desc': 'Latest-generation automatic multi-point mesh welders with 48 heads operating simultaneously — producing 60 standard panels per hour. Pneumatic-hydraulic pressure system ensures consistent weld strength to GB/T standard.',
    'fl-1-label': 'Welding Rate', 'fl-1-val': '60 panels/hr (std. 2.4×6m)',
    'fl-2-label': 'Weld Pressure', 'fl-2-val': 'Pneumo-hydraulic, ±2% precision',
    'fl-3-label': 'Adjustable Spacing', 'fl-4-label': 'Wire Diameter Range',
    'fc1-overlay': 'Pneumo-Hydraulic Weld Heads', 'fc1-title': 'Precision Weld Head Array', 'fc1-desc': '48 independent pneumo-hydraulic heads ensure consistent quality at every mesh intersection.',
    'fc2-overlay': 'Fully Auto Feed System', 'fc2-title': 'Lateral Feed · Precision Positioning', 'fc2-desc': 'Servo-driven automatic lateral wire feed with positioning accuracy within ±0.5mm.',
    'fc3-overlay': 'Cold-Draw Straightening Line', 'fc3-title': 'Cold Draw · Wire Straightening', 'fc3-desc': '8 cold-draw straightening machines in line, automatically conveying wire to the welding machine feed end.',
    'fc4-overlay': 'Auto Payoff System', 'fc4-title': 'Wire Rod Auto Payoff Stand', 'fc4-desc': 'High-capacity payoff stands rated up to 3 tonnes, with tension control for uniform wire supply.',
    'fc5-overlay': 'Zhongyue Steel · Factory Overview', 'fc5-title': '26,000㎡ Modern Factory',
    'fc5-desc': 'Equipped with 10-tonne overhead cranes and a fully integrated cold-draw → straighten → weld → cut → inspect → stock line. Daily capacity up to 800 tonnes.',
    'fact-1': 'Daily Output (T)', 'fact-2': 'Export Countries', 'fact-3': 'Staff Members', 'fact-4': 'Industry Awards',
    'why-tag': 'Why Choose Us', 'why-title': 'Six Reasons to <em>Choose Zhongyue</em>',
    'why-lead': 'Six core reasons why top global engineers and contractors choose Zhongyue Steel.',
    'why-1-title': 'Factory Quality Certificate', 'why-1-desc': 'Every batch ships with test reports covering weld tensile strength, wire tolerance, and mesh accuracy — fully traceable.',
    'why-2-title': 'On-Time Delivery', 'why-2-desc': '99% on-time fulfillment rate. Own fleet plus port partnerships — standard orders ship within 15 business days.',
    'why-3-title': 'Custom Specification Service', 'why-3-desc': 'Custom wire diameter, spacing, and panel size per drawing. In-house technical engineers provide full support.',
    'why-4-title': 'Factory-Direct Pricing', 'why-4-desc': 'No middlemen — our direct factory quotes are highly competitive. Volume buyers enjoy additional discounts.',
    'why-5-title': 'Global Supply Capability', 'why-5-desc': 'Partner warehouses on 4 continents. Dedicated export team offers FOB, CIF, and other trade terms.',
    'why-6-title': '24/7 Technical Support', 'why-6-desc': 'Dedicated account managers and structural engineers online around the clock for selection advice and on-site technical consultation.',
    'testi-tag': 'Client Reviews', 'testi-title': 'What <em>Clients Say</em>',
    'testi-1-text': 'Zhongyue Steel\'s mesh weld strength and dimensional tolerances fully met our design requirements. Lead time was just 12 days, QC reports were complete, and inspection passed on the first try.',
    'testi-1-name': 'Li Jianming / Procurement Director',
    'testi-2-text': 'We switched all floor slab reinforcement to Zhongyue Steel two years ago. Compared to manual tying, construction efficiency improved by 40%, costs dropped 18%, and quality is more consistent.',
    'testi-2-name': 'Chen Xiaofang / Supply Chain Manager',
    'testi-3-text': 'Custom-shape mesh for tunnel lining was fabricated per our drawings. The Zhongyue technical team supported us throughout, achieving the required precision. We will continue the partnership.',
    'testi-3-name': 'Wang Haitao / Equipment Engineer',
    'del-label': 'On-Time Delivery', 'del-title': 'Efficient Logistics · <span>Direct to Site</span>',
    'del-desc': 'From workshop to worksite, fully tracked delivery. Our heavy-duty truck fleet covers Cambodia and surrounding regions, ensuring steel mesh arrives safely and on schedule.',
    'del-badge-1': 'Bulk Dispatch', 'del-card-1-title': 'Full Truckload · Ready to Ship',
    'del-card-1-desc': 'Heavy flatbed trucks fully loaded with steel mesh panels — up to 20–30 tonnes per truck',
    'del-badge-2': 'Nationwide', 'del-card-2-title': 'Pro Fleet · Full Tracking',
    'del-card-2-desc': 'Covers Cambodia, and worksites across all provinces — guaranteed on-time delivery',
    'del-stat-1-unit': 'Hrs', 'del-stat-1-label': 'Dispatch after order',
    'del-stat-2-unit': 'T / Truck', 'del-stat-2-label': 'Max load per trip',
    'del-stat-3-unit': '+ Provinces', 'del-stat-3-label': 'Nationwide coverage',
    'del-stat-4-label': 'Cargo damage guarantee',
    'cta-title': 'Ready to Order<br/>Premium Steel Mesh?',
    'cta-desc': 'Receive a formal quotation with QC report within 24 hours.',
    'cta-btn': 'Get a Quote Now',
    'contact-tag': 'Contact Us', 'contact-title': 'Business <em>Inquiries</em>',
    'contact-desc': 'Whether you need an immediate quote, a long-term supply agreement, or technical selection support — our expert team will reply within one business day.',
    'contact-addr-label': 'Factory Address', 'contact-addr': 'CJJG+HHH, Khum Trapeang Kong, Cambodia',
    'contact-map-btn': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg> View on Google Maps',
    'contact-phone-label': 'Sales Hotline', 'contact-email-label': 'Email',
    'form-title': 'Send an Inquiry', 'form-name': 'Name', 'form-company': 'Company',
    'form-company-ph': 'Your company name', 'form-email': 'Email', 'form-phone': 'Phone',
    'form-product': 'Product of Interest', 'form-product-default': '— Select a product —',
    'form-opt-1': 'Welded Rebar Mesh / Construction Panel', 'form-opt-2': 'Floor Slab Mesh',
    'form-opt-3': 'Welded Fence Mesh', 'form-opt-4': 'Custom-Shape Mesh',
    'form-opt-5': 'Cold-Drawn Wire / Rod', 'form-opt-6': 'Multiple Products / General Inquiry',
    'form-detail': 'Inquiry Details &amp; Specifications',
    'form-detail-ph': 'Please provide wire diameter, spacing, panel size, quantity, and delivery destination…',
    'form-submit': 'Send Inquiry',
    'footer-about': 'Focused on the R&D, production, and sales of welded steel mesh — serving construction, infrastructure, and industrial sectors since 2002.',
    'footer-col-1': 'Products', 'footer-col-2': 'Company', 'footer-col-3': 'Newsletter',
    'footer-newsletter-desc': 'Subscribe for the latest prices, new product releases, and industry updates.',
    'footer-email-ph': 'Your email address',
    'footer-cert': 'Quality Certificate',
    'footer-copy': '© 2026 Zhongyue Steel Wire Group. All Rights Reserved.',
    'footer-privacy': 'Privacy Policy', 'footer-terms': 'Terms of Use', 'footer-cert-link': 'Certificates',
    'page-title': 'Zhongyue Steel — Professional Welded Rebar Mesh Manufacturer',
    'meta-desc': 'ISO 9001 certified welded rebar mesh manufacturer in Cambodia. Wire 3–12mm, custom sizes. Serving 60+ countries since 2002. Get a free quote in 24 hours.',
  },
};

function setLang(lang) {
  var data = i18nData[lang];
  if (!data) return;
  document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (data[key] !== undefined) el.innerHTML = data[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-placeholder');
    if (data[key] !== undefined) el.placeholder = data[key];
  });
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  if (data['page-title']) document.title = data['page-title'];
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && data['meta-desc']) metaDesc.setAttribute('content', data['meta-desc']);
  localStorage.setItem('zy-lang', lang);
}

/* Apply language on load: URL param > localStorage > browser language > default zh */
(function() {
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var saved   = localStorage.getItem('zy-lang');
  var browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
  var lang    = urlLang || saved || (browser.startsWith('en') ? 'en' : 'zh');
  setLang(lang);

  document.querySelectorAll('.lang-btn[data-lang]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setLang(btn.getAttribute('data-lang'));
    });
  });
})();

(function () {
  'use strict';

  /* ── UTILITY: debounce ── */
  function debounce(fn, delay) {
    var timer;
    return function() { clearTimeout(timer); timer = setTimeout(fn, delay); };
  }

  /* ── MOBILE MENU ── */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? '关闭菜单 / Close menu' : '打开菜单 / Open menu');
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', '打开菜单 / Open menu');
      }
    });
  }

  /* ── NATIVE SMOOTH SCROLL (delegated anchor clicks) ── */
  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    var id = anchor.getAttribute('href').slice(1);
    if (!id) { e.preventDefault(); return; }
    var target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });

  /* ══════════════════════════════════
     GSAP ANIMATIONS
  ══════════════════════════════════ */
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    ['.hero-tagline','.hero-desc','.hero-btns','.hero-stats-bar','.feature-card',
     '.facility-eyebrow-text','.fac-line-1','.fac-line-2','.facility-desc',
     '.facility-stats','.facility-cta'].forEach(function(s) {
      document.querySelectorAll(s).forEach(function(el) {
        el.style.opacity = '1'; el.style.transform = 'none';
      });
    });
    document.querySelectorAll('.ptl-step').forEach(function(s) { s.classList.add('visible'); });
    var fabEl = document.getElementById('fab-group');
    if (fabEl) fabEl.classList.add('visible');
  }

  if (!prefersReducedMotion) {

  /* ── HERO ENTRANCE ANIMATION ── */
  /* Restores opacity on elements that are CSS-initialised to opacity:0 */
  (function initHeroEntrance() {
    var tl = gsap.timeline({ delay: 0.25 });
    tl
      .fromTo('.hero-tagline',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
      .fromTo('.hero-desc',      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-btns',      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.60, ease: 'power3.out' }, '-=0.35')
      .fromTo('.hero-stats-bar', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.60, ease: 'power3.out' }, '-=0.3');
  })();

  /* ── Feature Cards Entrance ── */
  gsap.from('.feature-card', {
    scrollTrigger: { trigger: '.feature-cards-section', start: 'top 88%' },
    opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: 'power3.out'
  });

  /* ── Section Reveals (generic) ── */
  gsap.utils.toArray('.section-tag, .section-title, .section-lead').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 0, y: 30, duration: 0.7, ease: 'power3.out'
    });
  });

  /* ── About Section — Steel Factory Redesign ── */

  // Canvas animated steel-wire background
  (function initAboutCanvas() {
    const canvas = document.getElementById('about-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, lines = [], dots = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', debounce(resize, 150), { passive: true });

    // Build grid lines
    function buildGrid() {
      lines = [];
      const cols = 18, rows = 12;
      for (let c = 0; c <= cols; c++) {
        lines.push({ x1: (W/cols)*c, y1: 0, x2: (W/cols)*c, y2: H, vertical: true });
      }
      for (let r = 0; r <= rows; r++) {
        lines.push({ x1: 0, y1: (H/rows)*r, x2: W, y2: (H/rows)*r, vertical: false });
      }
      dots = [];
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          dots.push({ x: (W/cols)*c, y: (H/rows)*r,
            phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 0.8 });
        }
      }
    }
    buildGrid();
    window.addEventListener('resize', debounce(buildGrid, 150), { passive: true });

    let t = 0;
    var bgRafId = null;
    function drawAboutBg() {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      // Grid lines — pulsing opacity
      lines.forEach(l => {
        const pulse = 0.04 + 0.04 * Math.sin(t * 0.7 + (l.vertical ? l.x1 : l.y1) * 0.015);
        ctx.strokeStyle = `rgba(40,100,200,${pulse})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x2, l.y2);
        ctx.stroke();
      });

      // Intersection weld dots
      dots.forEach(d => {
        const glow = 0.15 + 0.15 * Math.sin(t * d.speed + d.phase);
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(227,30,36,${glow})`;
        ctx.fill();
      });

      bgRafId = requestAnimationFrame(drawAboutBg);
    }

    // Pause loop when section is off-screen
    var bgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          if (!bgRafId) bgRafId = requestAnimationFrame(drawAboutBg);
        } else {
          cancelAnimationFrame(bgRafId);
          bgRafId = null;
        }
      });
    }, { threshold: 0 });
    bgObserver.observe(canvas);
    bgRafId = requestAnimationFrame(drawAboutBg);
  })();

  // Photo sparks — glowing embers rising from bottom of the photo
  (function initAboutSparks() {
    const canvas = document.getElementById('about-sparks');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, sparks = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', debounce(resize, 150), { passive: true });

    function spawn() {
      sparks.push({
        x: W * 0.3 + Math.random() * W * 0.4,
        y: H,
        vx: (Math.random() - 0.5) * 1.0,
        vy: -(1.5 + Math.random() * 2.5),
        life: 1,
        decay: 0.008 + Math.random() * 0.012,
        size: 1 + Math.random() * 2,
        color: Math.random() > 0.5 ? 'rgba(255,120,30,' : 'rgba(227,30,36,'
      });
    }

    var sparksRafId = null;
    function drawAboutSparks() {
      ctx.clearRect(0, 0, W, H);
      if (Math.random() < 0.35) spawn();

      sparks = sparks.filter(s => s.life > 0);
      sparks.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy *= 0.99;
        s.vx += (Math.random() - 0.5) * 0.08;
        s.life -= s.decay;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI*2);
        ctx.fillStyle = s.color + s.life.toFixed(2) + ')';
        ctx.shadowColor = s.color + '0.8)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      sparksRafId = requestAnimationFrame(drawAboutSparks);
    }

    var sparksObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          if (!sparksRafId) sparksRafId = requestAnimationFrame(drawAboutSparks);
        } else {
          cancelAnimationFrame(sparksRafId);
          sparksRafId = null;
        }
      });
    }, { threshold: 0 });
    sparksObserver.observe(canvas);
    sparksRafId = requestAnimationFrame(drawAboutSparks);
  })();

  // GSAP scroll animations
  const aboutSection = document.querySelector('.about-steel');
  if (aboutSection) {

    // Photo frame entrance
    gsap.from('.about-photo-frame', {
      scrollTrigger: { trigger: '.about-steel', start: 'top 75%' },
      opacity: 0, x: -60, duration: 1.1, ease: 'power3.out'
    });
    gsap.from('.about-accent-frame', {
      scrollTrigger: { trigger: '.about-steel', start: 'top 70%' },
      opacity: 0, x: -40, y: 30, duration: 0.9, delay: 0.3, ease: 'power3.out'
    });

    // Year badge
    gsap.from('.about-year-badge', {
      scrollTrigger: { trigger: '.about-steel', start: 'top 72%' },
      opacity: 0, scale: 0.7, duration: 0.7, delay: 0.6, ease: 'back.out(1.6)'
    });

    // Text content stagger
    gsap.from(['.about-content .section-tag', '.about-content .section-title', '.about-lead-text'], {
      scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
      opacity: 0, y: 28, stagger: 0.12, duration: 0.8, ease: 'power3.out'
    });

    // Stat cards entrance + progress bars + number counters
    const statCards = document.querySelectorAll('.about-stat-card');
    statCards.forEach(function(card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: '.about-stats-grid', start: 'top 82%' },
        opacity: 0, y: 24, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
      });
    });

    ScrollTrigger.create({
      trigger: '.about-stats-grid',
      start: 'top 80%',
      once: true,
      onEnter: function() {
        statCards.forEach(function(card, i) {
          var bar = card.querySelector('.about-stat-bar');
          var pct = parseInt(bar.dataset.pct) || 75;
          gsap.to(bar, { scaleX: pct / 100, duration: 1.4, delay: i * 0.1, ease: 'power2.out' });

          var counter = card.querySelector('.about-stat-count');
          var tgt = parseInt(counter.dataset.target) || 0;
          var obj = { val: 0 };
          gsap.to(obj, {
            val: tgt, duration: 1.6, delay: i * 0.1 + 0.2, ease: 'power2.out',
            onUpdate: function() { counter.textContent = Math.round(obj.val); }
          });
        });
      }
    });

    // Feature rows entrance
    gsap.from('.about-feat-row', {
      scrollTrigger: { trigger: '.about-feats', start: 'top 85%' },
      opacity: 0, x: 30, stagger: 0.12, duration: 0.7, ease: 'power3.out'
    });

    // Corner accent glow pulse — paused when offscreen
    var cornerTween = gsap.to('.about-corner', {
      boxShadow: '0 0 18px rgba(227,30,36,1)',
      repeat: -1, yoyo: true, duration: 2.0, ease: 'sine.inOut', paused: true
    });
    var cornerEl = document.querySelector('.about-corner');
    if (cornerEl) {
      new IntersectionObserver(function(entries) {
        entries.forEach(function(e) { e.isIntersecting ? cornerTween.play() : cornerTween.pause(); });
      }, { threshold: 0 }).observe(cornerEl);
    }
  }

  /* ── Products ── */
  gsap.from('.product-card', {
    scrollTrigger: { trigger: '.products-grid', start: 'top 80%' },
    opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: 'power3.out'
  });

  /* ── Why Us / Process Cards ── */
  gsap.from('.process-card', {
    scrollTrigger: { trigger: '.process-grid', start: 'top 82%' },
    opacity: 0, y: 40, stagger: 0.12, duration: 0.75, ease: 'power3.out'
  });

  /* ── Stats counters ── */
  gsap.utils.toArray('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val).toLocaleString();
          }
        });
      }
    });
  });

  /* ══════════════════════════════════
     FACILITY PARALLAX SHOWCASE
  ══════════════════════════════════ */
  (function initFacility() {
    var section  = document.querySelector('.facility-showcase');
    var parallax = document.getElementById('facility-parallax');
    var img      = document.getElementById('facility-img');
    if (!section || !parallax) return;

    /* Parallax scroll on the background image */
    gsap.to(parallax, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8
      },
      y: '18%',
      ease: 'none'
    });

    /* Sky/clouds: subtle scale-up as you scroll in */
    gsap.fromTo(img,
      { scale: 1.08 },
      {
        scale: 1.0,
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'center center', scrub: 1 },
        ease: 'none'
      }
    );

    /* Text entrance animations */
    var tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 72%', once: true }
    });

    tl
      .fromTo('.facility-line',         { scaleX: 0 },            { scaleX: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' })
      .fromTo('.facility-eyebrow-text', { opacity: 0, y: 12 },    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo('.fac-line-1',            { opacity: 0, y: 40 },    { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, '-=0.3')
      .fromTo('.fac-line-2',            { opacity: 0, y: 30 },    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6')
      .fromTo('.facility-desc',         { opacity: 0, y: 20 },    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .fromTo('.facility-stats',        { opacity: 0, y: 20 },    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo('.facility-cta',          { opacity: 0, y: 15 },    { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.2');
  })();

  /* ── Testimonials ── */
  gsap.from('.testi-card', {
    scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' },
    opacity: 0, y: 50, stagger: 0.14, duration: 0.8, ease: 'power3.out'
  });

  /* ── Delivery Section ── */
  (function initDelivery() {
    var cards = document.querySelectorAll('.delivery-card');
    if (!cards.length) return;
    gsap.from(cards, {
      scrollTrigger: { trigger: '.delivery-grid', start: 'top 82%' },
      opacity: 0, y: 60, scale: 0.96, stagger: 0.18, duration: 0.9, ease: 'power3.out'
    });
    /* Counter animation for delivery stats */
    var statNums = document.querySelectorAll('.delivery-stat-num');
    statNums.forEach(function(el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      ScrollTrigger.create({
        trigger: '.delivery-stats',
        start: 'top 85%',
        once: true,
        onEnter: function() {
          var obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 1.8, ease: 'power2.out',
            onUpdate: function() { el.textContent = Math.round(obj.val); }
          });
        }
      });
    });
  })();

  /* ══════════════════════════════════
     PRODUCTION TIMELINE ANIMATION
  ══════════════════════════════════ */
  (function initTimeline() {
    var lineFill = document.getElementById('ptl-fill');
    var steps    = document.querySelectorAll('.ptl-step');
    if (!lineFill || !steps.length) return;

    /* Stagger reveal steps on scroll */
    ScrollTrigger.create({
      trigger: '.ptl-track',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        steps.forEach(function (s, i) {
          setTimeout(function () {
            s.classList.add('visible');
          }, i * 130);
        });
      }
    });

    /* Animate the fill line */
    ScrollTrigger.create({
      trigger: '.ptl-track',
      start: 'top 75%',
      end: 'bottom 60%',
      scrub: 0.6,
      onUpdate: function (self) {
        var pct = Math.min(self.progress * 100 * 1.4, 100);
        lineFill.style.width = pct + '%';

        /* light up nodes as line passes */
        var total = steps.length;
        steps.forEach(function (step, i) {
          var threshold = (i / (total - 1)) * 0.72;
          if (self.progress >= threshold) {
            step.classList.add('lit');
          }
        });
      }
    });
  })();

  /* ══════════════════════════════════
     FLOATING CTAS VISIBILITY
  ══════════════════════════════════ */
  var fabGroup = document.getElementById('fab-group');
  if (fabGroup) {
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'bottom 70%',
      onEnter: function () { fabGroup.classList.add('visible'); },
      onLeaveBack: function () { fabGroup.classList.remove('visible'); }
    });
  }

  } /* end if (!prefersReducedMotion) */

  /* ── Active nav highlighting (IntersectionObserver — no scroll listener needed) ── */
  var navLinks = document.querySelectorAll('nav a[href^="#"], .mobile-nav a[href^="#"]');
  var sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(link) { link.style.color = ''; });
        var active = document.querySelector('nav a[href="#' + entry.target.id + '"]');
        if (active) active.style.color = 'var(--red)';
      }
    });
  }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('section[id]').forEach(function(sec) { sectionObserver.observe(sec); });

  /* ── CONTACT FORM ── */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var formLoadTime = Date.now();

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameEl    = document.getElementById('input-name');
      var emailEl   = document.getElementById('input-email');
      var submitBtn = document.getElementById('submit-btn');
      var replyTo   = document.getElementById('replyto-field');
      var hpField   = document.getElementById('hp-website');
      var currentLang = localStorage.getItem('zy-lang') || 'zh';

      /* Honeypot: bots fill hidden fields, humans don't */
      if (hpField && hpField.value) return;

      /* Timing: genuine users take >2 s to fill a form */
      if (Date.now() - formLoadTime < 2000) return;

      /* Client-side rate limiting: max 3 submissions per hour */
      var RL_KEY = 'zy_form_submissions';
      var now = Date.now();
      var log = JSON.parse(localStorage.getItem(RL_KEY) || '[]').filter(function(t) { return now - t < 3600000; });
      if (log.length >= 3) {
        submitBtn.textContent = currentLang === 'en' ? 'Too many attempts — try later' : '提交过于频繁，请稍后再试';
        setTimeout(function() { submitBtn.textContent = (i18nData[currentLang] && i18nData[currentLang]['form-submit']) || '提交询价 / Send Inquiry'; }, 4000);
        return;
      }

      if (nameEl && !nameEl.value.trim()) {
        nameEl.focus();
        nameEl.style.borderColor = 'var(--red)';
        return;
      }
      if (emailEl && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
        emailEl.focus();
        emailEl.style.borderColor = 'var(--red)';
        return;
      }
      if (nameEl) nameEl.style.borderColor = '';
      if (emailEl) emailEl.style.borderColor = '';
      if (replyTo && emailEl) replyTo.value = emailEl.value;

      submitBtn.disabled = true;
      submitBtn.textContent = currentLang === 'en' ? 'Sending…' : '提交中…';

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        var submitLabel = (i18nData[currentLang] && i18nData[currentLang]['form-submit']) || (currentLang === 'en' ? 'Send Inquiry' : '提交询价 / Send Inquiry');
        if (res.status === 422) {
          /* Formspree: email not yet confirmed — owner must click confirmation link */
          submitBtn.textContent = currentLang === 'en' ? 'Please confirm your Formspree email first' : '请先确认Formspree邮件';
          submitBtn.disabled = false;
          return;
        }
        if (res.ok) {
          /* Log successful submission for rate limiting */
          log.push(Date.now());
          localStorage.setItem(RL_KEY, JSON.stringify(log));

          submitBtn.textContent = currentLang === 'en' ? '✓ Sent!' : '✓ 提交成功';
          submitBtn.classList.add('success');
          contactForm.querySelectorAll('input:not([type="hidden"]), textarea, select')
            .forEach(function (el) { el.value = ''; });
          setTimeout(function () {
            submitBtn.textContent = submitLabel;
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
          }, 3500);
        } else {
          submitBtn.textContent = currentLang === 'en' ? 'Error — try again' : '提交失败，请重试';
          setTimeout(function () {
            submitBtn.textContent = submitLabel;
            submitBtn.disabled = false;
          }, 3000);
        }
      }).catch(function () {
        var submitLabel = (i18nData[currentLang] && i18nData[currentLang]['form-submit']) || (currentLang === 'en' ? 'Send Inquiry' : '提交询价 / Send Inquiry');
        submitBtn.textContent = currentLang === 'en' ? 'Error — try again' : '提交失败，请重试';
        setTimeout(function () {
          submitBtn.textContent = submitLabel;
          submitBtn.disabled = false;
        }, 3000);
      });
    });
  }

  /* ── NEWSLETTER ── */
  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('newsletter-input');
      if (input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        var lang = localStorage.getItem('zy-lang') || 'zh';
        var successMsg = lang === 'en' ? '✓ Subscribed!' : '✓ 订阅成功！';
        var defaultPh = (i18nData[lang] && i18nData[lang]['footer-email-ph']) || '您的邮箱地址';
        input.value = '';
        input.placeholder = successMsg;
        setTimeout(function () { input.placeholder = defaultPh; }, 2500);
      } else if (input) {
        input.focus();
        input.style.borderColor = 'var(--red)';
        setTimeout(function () { input.style.borderColor = ''; }, 2000);
      }
    });
  }

})();
