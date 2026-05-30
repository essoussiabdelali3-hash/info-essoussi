const ADMIN_PASSWORD = 'Essoussi15@';

let currentLang = 'fr';
let editingId = null;
let cart = [];
let activeCategory = 'all';
let previousPage = 'store';
let adminUnlocked = false;
let searchTerm = '';

const categoryNames = {
    numerique: { fr: 'Produits Numériques', ar: 'منتوجات رقمية' },
    electronique: { fr: 'Appareils Électroniques', ar: 'أجهزة إلكترونية' },
    solaire: { fr: 'Énergie Solaire', ar: 'طاقة شمسية' }
};

const defaultProducts = [
    { id: 1, name: 'Microsoft Office 2024', nameAr: 'مايكروسوفت أوفيس 2026', price: 4500, category: 'numerique', categoryAr: 'منتوجات رقمية', description: 'Licence originale Office 2024 Pro Plus', descriptionAr: 'ترخيص أصلي أوفيس 2024 برو بلس', image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400' },
    { id: 2, name: 'Adobe Creative Cloud', nameAr: 'أدوبي كريتيف كلاود', price: 8000, category: 'numerique', categoryAr: 'منتوجات رقمية', description: 'Abonnement annuel Adobe CC complet', descriptionAr: 'اشتراك سنوي أدوبي سي سي كامل', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400' },
    { id: 3, name: 'Guide Marketing Digital', nameAr: 'دليل التسويق الرقمي', price: 1500, category: 'numerique', categoryAr: 'منتوجات رقمية', description: 'E-book complet sur le marketing digital', descriptionAr: 'كتاب إلكتروني شامل عن التسويق الرقمي', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
    { id: 4, name: 'Formation Développement Web', nameAr: 'دورة تطوير الويب', price: 3500, category: 'numerique', categoryAr: 'منتوجات رقمية', description: 'Cours complet HTML, CSS, JavaScript', descriptionAr: 'دورة كاملة HTML, CSS, JavaScript', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400' },
    { id: 5, name: 'Template Portfolio Pro', nameAr: 'قالب بورتفوليو احترافي', price: 2500, category: 'numerique', categoryAr: 'منتوجات رقمية', description: 'Template responsive pour portfolio moderne', descriptionAr: 'قالب متجاوب لبورتفوليو عصري', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400' },
    { id: 6, name: 'Script Dashboard Admin', nameAr: 'سكربت لوحة تحكم', price: 5000, category: 'numerique', categoryAr: 'منتوجات رقمية', description: 'Dashboard admin complet avec React', descriptionAr: 'لوحة تحكم كاملة بـ React', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400' },
    { id: 7, name: 'Netflix Premium - 1 An', nameAr: 'نتفليكس بريميوم - سنة', price: 6000, category: 'numerique', categoryAr: 'منتوجات رقمية', description: 'Abonnement Netflix Premium 12 mois', descriptionAr: 'اشتراك نتفليكس بريميوم 12 شهر', image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=400' },
    { id: 8, name: 'Spotify Premium - 6 Mois', nameAr: 'سبوتيفاي بريميوم - 6 أشهر', price: 3000, category: 'numerique', categoryAr: 'منتوجات رقمية', description: 'Abonnement Spotify Premium 6 mois', descriptionAr: 'اشتراك سبوتيفاي بريميوم 6 أشهر', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400' },
    { id: 9, name: 'Samsung Galaxy S24', nameAr: 'سامسونج جالكسي S24', price: 12000, category: 'electronique', categoryAr: 'أجهزة إلكترونية', description: 'Smartphone Samsung dernière génération', descriptionAr: 'هاتف سامسونج الجيل الأحدث', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
    { id: 10, name: 'Écran 4K 32"', nameAr: 'شاشة 4K 32 بوصة', price: 8500, category: 'electronique', categoryAr: 'أجهزة إلكترونية', description: 'Moniteur UHD 4K 32 pouces', descriptionAr: 'شاشة UHD 4K 32 بوصة', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
    { id: 11, name: 'Panneau Solaire 300W', nameAr: 'لوح شمسي 300 واط', price: 3500, category: 'solaire', categoryAr: 'طاقة شمسية', description: 'Panneau solaire monocristallin 300W haute efficacité', descriptionAr: 'لوح شمسي أحادي البلورة 300 واط عالي الكفاءة', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400' },
    { id: 12, name: 'Batterie Solaire 12V', nameAr: 'بطارية شمسية 12 فولط', price: 2500, category: 'solaire', categoryAr: 'طاقة شمسية', description: 'Batterie solaire 12V 100Ah pour stockage d\'énergie', descriptionAr: 'بطارية شمسية 12V 100Ah لتخزين الطاقة', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400' }
];

const defaultReviews = [
    { id: 1, name: 'Ahmed B.', nameAr: 'أحمد ب.', rating: 5, text: 'Excellent service! J\'ai reçu mon produit immédiatement. Très satisfait.', textAr: 'خدمة ممتازة! استلمت منتجي فوراً. راضٍ جداً.', date: '2026-05-15' },
    { id: 2, name: 'Sarah M.', nameAr: 'سارة م.', rating: 5, text: 'Les prix sont très compétitifs et le support est réactif. Je recommande!', textAr: 'الأسعار تنافسية جداً والدعم سريع. أنصح بهم!', date: '2026-05-10' },
    { id: 3, name: 'Karim T.', nameAr: 'كريم ت.', rating: 4, text: 'Très bon rapport qualité-prix. Le template que j\'ai acheté est de grande qualité.', textAr: 'نسبة جودة/سعر ممتازة. القالب الذي اشتريته عالي الجودة.', date: '2026-05-08' },
    { id: 4, name: 'Fatima Z.', nameAr: 'فاطمة ز.', rating: 5, text: 'Merci pour la livraison rapide! Le e-book était exactement ce que je cherchais.', textAr: 'شكراً على التسليم السريع! الكتاب الإلكتروني كان بالضبط ما أبحث عنه.', date: '2026-05-05' },
    { id: 5, name: 'Mohamed R.', nameAr: 'محمد ر.', rating: 5, text: 'Professionnel et fiable. J\'ai acheté plusieurs produits et tous fonctionnent parfaitement.', textAr: 'محترف وموثوق. اشتريت عدة منتجات وجميعها تعمل بشكل مثالي.', date: '2026-04-28' },
    { id: 6, name: 'Amina K.', nameAr: 'أمينة ك.', rating: 4, text: 'Bon service client. Ils m\'ont aidé à configurer mon abonnement rapidement.', textAr: 'خدمة عملاء جيدة. ساعدوني في إعداد اشتراكي بسرعة.', date: '2026-04-20' }
];

const STORAGE_VERSION = 2;
const STORAGE_KEY = 'techstore_products';

function getProducts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        saveProducts(defaultProducts);
        return defaultProducts;
    }
    try {
        const data = JSON.parse(stored);
        if (data.version === STORAGE_VERSION && Array.isArray(data.products)) {
            return data.products;
        }
    } catch (e) {}
    saveProducts(defaultProducts);
    return defaultProducts;
}

function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, products }));
}

function getReviews() {
    const stored = localStorage.getItem('techstore_reviews');
    if (!stored) {
        localStorage.setItem('techstore_reviews', JSON.stringify(defaultReviews));
        return defaultReviews;
    }
    return JSON.parse(stored);
}

function saveReviews(reviews) {
    localStorage.setItem('techstore_reviews', JSON.stringify(reviews));
}

function formatPrice(price) {
    return new Intl.NumberFormat(currentLang === 'ar' ? 'ar-MA' : 'fr-MA').format(price) + ' MAD';
}

function getProductImages(product) {
    if (Array.isArray(product.images) && product.images.length > 0) {
        return product.images.filter(Boolean);
    }
    if (product.image) return [product.image];
    return ['default-product.svg'];
}
function getProductImage(product) {
    return getProductImages(product)[0];
}

function renderStore() {
    const grid = document.getElementById('productsGrid');
    let products = getProducts();
    if (activeCategory !== 'all') {
        products = products.filter(p => p.category === activeCategory);
    }
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.nameAr.includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.descriptionAr.includes(term)
        );
    }
    if (products.length === 0) {
        grid.innerHTML = `<div class="no-products"><div class="no-products-icon">📦</div><p class="lang-fr">Aucun produit disponible</p><p class="lang-ar">لا توجد منتجات متاحة</p></div>`;
        return;
    }
    grid.innerHTML = products.map(product => `
        <article class="product-card" onclick="openProductDetail(${product.id})">
            <div class="product-image">
                <img src="${getProductImage(product)}" alt="${currentLang === 'fr' ? product.name : product.nameAr} - info-essoussi" loading="lazy" onerror="this.src='default-product.svg'">
                <span class="delivery-badge">🚚 <span class="lang-fr">Gratuit</span><span class="lang-ar">مجاني</span></span>
            </div>
            <div class="product-info">
                <span class="product-category">${currentLang === 'fr' ? (categoryNames[product.category]?.fr || product.category) : (product.categoryAr || product.category)}</span>
                <h3 class="product-name">${currentLang === 'fr' ? product.name : product.nameAr}</h3>
                <p class="product-description">${currentLang === 'fr' ? product.description : product.descriptionAr}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <span class="lang-fr">Ajouter</span>
                        <span class="lang-ar">أضف</span>
                    </button>
                </div>
            </div>
        </article>
    `).join('');

    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (relatedGrid) relatedGrid.innerHTML = '';
}

function renderReviews() {
    const reviews = getReviews();
    const slider = document.getElementById('reviewsSlider');
    const grid = document.getElementById('reviewsGrid');
    const previewReviews = reviews.slice(0, 3);
    const allReviews = reviews;

    const renderReviewCard = (review) => `
        <article class="review-card">
            <header class="review-header">
                <div class="review-author">
                    <div class="review-avatar" aria-hidden="true">${(currentLang === 'fr' ? review.name : review.nameAr).charAt(0)}</div>
                    <div>
                        <div class="review-name">${currentLang === 'fr' ? review.name : review.nameAr}</div>
                        <div class="review-date"><time datetime="${review.date}">${review.date}</time></div>
                    </div>
                </div>
                <div class="review-stars" aria-label="${review.rating} étoiles">${'⭐'.repeat(review.rating)}</div>
            </header>
            <p class="review-text">${currentLang === 'fr' ? review.text : review.textAr}</p>
        </article>
    `;

    if (slider) slider.innerHTML = previewReviews.map(renderReviewCard).join('');
    if (grid) grid.innerHTML = allReviews.map(renderReviewCard).join('');
}

function renderAdminTable() {
    const tbody = document.getElementById('adminProductsBody');
    const products = getProducts();
    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--text-light)"><span class="lang-fr">Aucun produit ajouté</span><span class="lang-ar">لم يتم إضافة أي منتج</span></td></tr>`;
        return;
    }
    tbody.innerHTML = products.map(product => `
        <tr>
            <td><img src="${getProductImage(product)}" class="table-image" onerror="this.src='default-product.svg'"></td>
            <td>${currentLang === 'fr' ? product.name : product.nameAr}</td>
            <td><strong>${formatPrice(product.price)}</strong></td>
            <td>${currentLang === 'fr' ? product.category : product.categoryAr}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-warning" onclick="editProduct(${product.id})"><span class="lang-fr">Modifier</span><span class="lang-ar">تعديل</span></button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})"><span class="lang-fr">Supprimer</span><span class="lang-ar">حذف</span></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderAdminReviews() {
    const tbody = document.getElementById('adminReviewsBody');
    const reviews = getReviews();
    if (reviews.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:30px;color:var(--text-light)"><span class="lang-fr">Aucun avis</span><span class="lang-ar">لا توجد تقييمات</span></td></tr>`;
        return;
    }
    tbody.innerHTML = reviews.map(review => `
        <tr>
            <td>${currentLang === 'fr' ? review.name : review.nameAr}</td>
            <td>${'⭐'.repeat(review.rating)}</td>
            <td>${currentLang === 'fr' ? review.text : review.textAr}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-danger" onclick="deleteReview(${review.id})"><span class="lang-fr">Supprimer</span><span class="lang-ar">حذف</span></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addToCart(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
        const existing = cart.find(item => item.id === id);
        if (existing) existing.qty++;
        else cart.push({ ...product, qty: 1 });
        updateCartModal();
        document.getElementById('cartModal').classList.add('active');
    }
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (cart.length === 0) {
        cartItems.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:20px"><span class="lang-fr">Panier vide</span><span class="lang-ar">السلة فارغة</span></p>`;
        cartTotal.textContent = '0 MAD';
        return;
    }
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div><strong>${currentLang === 'fr' ? item.name : item.nameAr}</strong><br><small>${formatPrice(item.price)} x ${item.qty}</small></div>
            <button class="btn btn-danger" style="padding:4px 8px" onclick="removeFromCart(${item.id})">&times;</button>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartTotal.textContent = formatPrice(total);

    const hasPhysical = cart.some(item => item.category === 'electronique' || item.category === 'solaire');
    const addrSection = document.getElementById('shippingAddressSection');
    if (hasPhysical) {
        addrSection.style.display = 'block';
    } else {
        addrSection.style.display = 'none';
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartModal();
}

let detailQty = 1;

function openProductDetail(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (!product) return;

    detailQty = 1;
    document.getElementById('detailQtyValue').textContent = '1';

    const images = getProductImages(product);
    let currentImageIndex = 0;
    const fullImg = document.getElementById('fullDetailImage');
    function showImage(index) {
        currentImageIndex = (index + images.length) % images.length;
        fullImg.src = images[currentImageIndex];
        fullImg.alt = (currentLang === 'fr' ? product.name : product.nameAr) + ' - info-essoussi';
        fullImg.onerror = function() { this.src = 'default-product.svg'; };
        document.querySelectorAll('.gallery-thumb').forEach((t, i) => {
            t.classList.toggle('active', i === currentImageIndex);
        });
    }
    showImage(0);

    const thumbsHtml = images.map((img, i) => `
        <img class="gallery-thumb ${i === 0 ? 'active' : ''}" src="${img}" alt="" onclick="showGalleryImage(${i})" loading="lazy" onerror="this.src='default-product.svg'">
    `).join('');
    document.getElementById('galleryThumbs').innerHTML = thumbsHtml;
    window.showGalleryImage = function(i) { showImage(i); };

    document.getElementById('galleryPrev').onclick = function() { showImage(currentImageIndex - 1); };
    document.getElementById('galleryNext').onclick = function() { showImage(currentImageIndex + 1); };
    document.getElementById('fullDetailBadge').textContent = currentLang === 'fr' ? '✨ Produit Vérifié' : '✨ منتج موثوق';
    const catName = categoryNames[product.category];
    document.getElementById('fullDetailCategory').textContent = currentLang === 'fr' ? (catName?.fr || product.category) : (catName?.ar || product.categoryAr || product.category);
    document.getElementById('fullDetailName').textContent = currentLang === 'fr' ? product.name : product.nameAr;
    document.getElementById('fullDetailDescription').textContent = currentLang === 'fr' ? product.description : product.descriptionAr;
    document.getElementById('fullDetailPrice').textContent = formatPrice(product.price);

    const features = {
        numerique: [
            { icon: '💻', fr: 'Produits digitaux de haute qualité', ar: 'منتوجات رقمية عالية الجودة' },
            { icon: '📥', fr: 'Téléchargement direct et instantané', ar: 'تحميل مباشر وفوري' },
            { icon: '🔄', fr: 'Mises à jour incluses', ar: 'تحديثات مجانية' },
            { icon: '🔑', fr: 'Licence originale et vérifiée', ar: 'ترخيص أصلي وموثق' },
            { icon: '📖', fr: 'Formats PDF/EPUB disponibles', ar: 'صيغ PDF/EPUB متوفرة' },
            { icon: '♾️', fr: 'Accès à vie et support inclus', ar: 'وصول مدى الحياة ودعم مشمول' }
        ],
        electronique: [
            { icon: '🔋', fr: 'Batterie performante', ar: 'بطارية قوية' },
            { icon: '📱', fr: 'Dernière technologie', ar: 'أحدث تقنية' },
            { icon: '📦', fr: 'Livraison rapide sous 48h', ar: 'توصيل سريع خلال 48 ساعة' },
            { icon: '✅', fr: 'Garantie 1 an', ar: 'ضمان سنة' }
        ],
        solaire: [
            { icon: '☀️', fr: 'Haute efficacité énergétique', ar: 'كفاءة طاقية عالية' },
            { icon: '🔋', fr: 'Stockage performant', ar: 'تخزين قوي' },
            { icon: '🌱', fr: 'Énergie propre et renouvelable', ar: 'طاقة نظيفة ومتجددة' },
            { icon: '📦', fr: 'Installation facile incluse', ar: 'تركيب سهل مشمول' }
        ]
    };
    const productFeatures = features[product.category] || features.numerique;
    document.getElementById('fullDetailFeatures').innerHTML = productFeatures.map(f => `
        <div class="feature-box">
            <span>${f.icon}</span>
            <span class="lang-fr">${f.fr}</span>
            <span class="lang-ar">${f.ar}</span>
        </div>
    `).join('');

    const specs = {
        numerique: [
            { fr: 'Type', ar: 'النوع', valFr: 'Produit numérique', valAr: 'منتج رقمي' },
            { fr: 'Livraison', ar: 'التوصيل', valFr: 'Instantanée après paiement', valAr: 'فوري بعد الدفع' },
            { fr: 'Support', ar: 'الدعم', valFr: 'Inclus 24/7', valAr: 'مشمول 24/7' },
            { fr: 'Retour', ar: 'الإرجاع', valFr: 'Satisfait ou remboursé', valAr: 'مضمون أو استرداد' }
        ],
        electronique: [
            { fr: 'Type', ar: 'النوع', valFr: 'Appareil électronique', valAr: 'جهاز إلكتروني' },
            { fr: 'Garantie', ar: 'الضمان', valFr: '1 an', valAr: 'سنة واحدة' },
            { fr: 'Livraison', ar: 'التوصيل', valFr: '48h partout au Maroc', valAr: '48 ساعة في جميع أنحاء المغرب' },
            { fr: 'Retour', ar: 'الإرجاع', valFr: '14 jours', valAr: '14 يوماً' }
        ],
        solaire: [
            { fr: 'Type', ar: 'النوع', valFr: 'Équipement solaire', valAr: 'معدات شمسية' },
            { fr: 'Garantie', ar: 'الضمان', valFr: '2 ans', valAr: 'سنتان' },
            { fr: 'Installation', ar: 'التركيب', valFr: 'Facile - Guide inclus', valAr: 'سهل - دليل مشمول' },
            { fr: 'Livraison', ar: 'التوصيل', valFr: '48h partout au Maroc', valAr: '48 ساعة في جميع أنحاء المغرب' }
        ]
    };
    const productSpecs = specs[product.category] || specs.numerique;
    document.getElementById('fullDetailSpecs').innerHTML = productSpecs.map(s => `
        <div class="spec-row">
            <span class="spec-label">${currentLang === 'fr' ? s.fr : s.ar}</span>
            <span class="spec-value">${currentLang === 'fr' ? s.valFr : s.valAr}</span>
        </div>
    `).join('');

    const isPhysical = product.category === 'electronique' || product.category === 'solaire';
    document.getElementById('fullDetailDelivery').innerHTML = isPhysical ? `
        <div class="delivery-detail">
            <div class="delivery-item"><span>🚚</span><span class="lang-fr">Livraison dans tout le Maroc sous 48h maximum</span><span class="lang-ar">توصيل في جميع أنحاء المغرب خلال 48 ساعة كحد أقصى</span></div>
            <div class="delivery-item"><span>💰</span><span class="lang-fr">Frais de livraison : Gratuit</span><span class="lang-ar">رسوم التوصيل: مجاني</span></div>
            <div class="delivery-item"><span>💵</span><span class="lang-fr">Paiement à la livraison disponible</span><span class="lang-ar">الدفع عند الاستلام متوفر</span></div>
        </div>
    ` : `
        <div class="delivery-detail">
            <div class="delivery-item"><span>⚡</span><span class="lang-fr">Livraison instantanée après confirmation de paiement</span><span class="lang-ar">تسليم فوري بعد تأكيد الدفع</span></div>
            <div class="delivery-item"><span>📥</span><span class="lang-fr">Téléchargement direct depuis votre compte</span><span class="lang-ar">تحميل مباشر من حسابك</span></div>
            <div class="delivery-item"><span>💰</span><span class="lang-fr">Frais de livraison : Gratuit</span><span class="lang-ar">رسوم التوصيل: مجاني</span></div>
        </div>
    `;

    document.getElementById('fullDetailAddToCart').onclick = function() {
        for (let i = 0; i < detailQty; i++) {
            addToCart(product.id);
        }
        detailQty = 1;
        document.getElementById('detailQtyValue').textContent = '1';
    };

    const productName = currentLang === 'fr' ? product.name : product.nameAr;
    document.getElementById('fullDetailWhatsApp').href = `https://wa.me/212665946134?text=${encodeURIComponent(currentLang === 'fr' ? `Bonjour, je suis intéressé par: ${productName} - ${formatPrice(product.price)}` : `مرحباً، أنا مهتم بـ: ${productName} - ${formatPrice(product.price)}`)}`;

    document.getElementById('fullDetailShare').onclick = function() {
        const url = window.location.href.split('?')[0] + '?product=' + product.id;
        if (navigator.share) {
            navigator.share({ title: productName, url });
        } else {
            navigator.clipboard.writeText(url);
            alert(currentLang === 'fr' ? '🔗 Lien copié !' : '🔗 تم نسخ الرابط!');
        }
    };

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (relatedProducts.length > 0) {
        relatedGrid.innerHTML = relatedProducts.map(p => `
            <div class="product-card" onclick="openProductDetail(${p.id})">
                <div class="product-image">
                    <img src="${getProductImage(p)}" alt="${currentLang === 'fr' ? p.name : p.nameAr} - info-essoussi" loading="lazy" onerror="this.src='default-product.svg'">
                    <span class="delivery-badge">🚚 <span class="lang-fr">Gratuit</span><span class="lang-ar">مجاني</span></span>
                </div>
                <div class="product-info">
                    <span class="product-category">${currentLang === 'fr' ? (categoryNames[p.category]?.fr || p.category) : (p.categoryAr || p.category)}</span>
                    <h3 class="product-name">${currentLang === 'fr' ? p.name : p.nameAr}</h3>
                    <p class="product-description">${currentLang === 'fr' ? p.description : p.descriptionAr}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(p.price)}</span>
                        <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${p.id})">
                            <span class="lang-fr">Ajouter</span>
                            <span class="lang-ar">أضف</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        document.getElementById('relatedProductsSection').style.display = 'block';
    } else {
        relatedGrid.innerHTML = '';
        document.getElementById('relatedProductsSection').style.display = 'none';
    }

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('productDetailPage').classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="desc"]').classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tabDesc').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('detailQtyMinus').addEventListener('click', function() {
    if (detailQty > 1) {
        detailQty--;
        document.getElementById('detailQtyValue').textContent = detailQty;
    }
});

document.getElementById('detailQtyPlus').addEventListener('click', function() {
    detailQty++;
    document.getElementById('detailQtyValue').textContent = detailQty;
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('tab' + this.dataset.tab.charAt(0).toUpperCase() + this.dataset.tab.slice(1)).classList.add('active');
    });
});

function goBackToStore() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('storePage').classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('.nav-link[data-page="store"]').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const nameAr = document.getElementById('productNameAr').value || name;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;
    const descriptionAr = document.getElementById('productDescriptionAr').value || description;
    const imageInputs = document.querySelectorAll('#imagesGroup .productImage');
    const images = Array.from(imageInputs).map(inp => inp.value).filter(Boolean);
    let products = getProducts();
    if (editingId) {
        const index = products.findIndex(p => p.id === editingId);
        if (index !== -1) {
            products[index] = { ...products[index], name, nameAr, price, category, categoryAr: categoryNames[category].ar, description, descriptionAr, images };
        }
        editingId = null;
        document.getElementById('cancelBtn').style.display = 'none';
    } else {
        products.push({ id: Date.now(), name, nameAr, price, category, categoryAr: categoryNames[category].ar, description, descriptionAr, images });
    }
    saveProducts(products);
    renderStore();
    renderAdminTable();
    this.reset();
    document.getElementById('productId').value = '';
});

document.querySelectorAll('#imagesGroup .upload-btn-sm input[type="file"]').forEach(inp => {
    inp.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const row = this.closest('.image-input-row');
            const urlInput = row.querySelector('.productImage');
            const reader = new FileReader();
            reader.onload = function(ev) {
                urlInput.value = ev.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
        editingId = id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productNameAr').value = product.nameAr || '';
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productDescriptionAr').value = product.descriptionAr || '';
        const imgs = Array.isArray(product.images) ? product.images : (product.image ? [product.image] : []);
        document.querySelectorAll('#imagesGroup .productImage').forEach((inp, i) => {
            inp.value = imgs[i] || '';
        });
        document.getElementById('cancelBtn').style.display = 'inline-block';
        document.getElementById('formTitle').querySelector('.lang-fr').textContent = 'Modifier le Produit';
        document.getElementById('formTitle').querySelector('.lang-ar').textContent = 'تعديل المنتج';
        document.getElementById('submitBtn').querySelector('.lang-fr').textContent = 'Enregistrer';
        document.getElementById('submitBtn').querySelector('.lang-ar').textContent = 'حفظ';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function deleteProduct(id) {
    if (confirm(currentLang === 'fr' ? 'Supprimer ce produit?' : 'حذف هذا المنتج؟')) {
        let products = getProducts().filter(p => p.id !== id);
        saveProducts(products);
        renderStore();
        renderAdminTable();
    }
}

function deleteReview(id) {
    if (confirm(currentLang === 'fr' ? 'Supprimer cet avis?' : 'حذف هذا التقييم؟')) {
        let reviews = getReviews().filter(r => r.id !== id);
        saveReviews(reviews);
        renderReviews();
        renderAdminReviews();
    }
}

document.getElementById('cancelBtn').addEventListener('click', function() {
    editingId = null;
    document.getElementById('productForm').reset();
    document.getElementById('cancelBtn').style.display = 'none';
    document.getElementById('formTitle').querySelector('.lang-fr').textContent = 'Ajouter un Produit';
    document.getElementById('formTitle').querySelector('.lang-ar').textContent = 'إضافة منتج';
    document.getElementById('submitBtn').querySelector('.lang-fr').textContent = 'Ajouter';
    document.getElementById('submitBtn').querySelector('.lang-ar').textContent = 'إضافة';
});

document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('reviewName').value;
    const rating = parseInt(document.getElementById('reviewRating').value);
    const text = document.getElementById('reviewText').value;
    const reviews = getReviews();
    reviews.unshift({
        id: Date.now(),
        name,
        nameAr: name,
        rating,
        text,
        textAr: text,
        date: new Date().toISOString().split('T')[0]
    });
    saveReviews(reviews);
    renderReviews();
    renderAdminReviews();
    this.reset();
    alert(currentLang === 'fr' ? 'Merci pour votre avis!' : 'شكراً على تقييمك!');
});

document.querySelectorAll('.nav-link, .footer-link, .admin-secret-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        if (!page) return;
        if (page === 'admin' && !adminUnlocked) {
            const pwd = prompt(currentLang === 'fr' ? '🔒 Mot de passe administrateur:' : '🔒 كلمة سر المسؤول:');
            if (pwd !== ADMIN_PASSWORD) {
                alert(currentLang === 'fr' ? 'Mot de passe incorrect' : 'كلمة السر خطأ');
                return;
            }
            adminUnlocked = true;
        }
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`.nav-link[data-page="${page}"]`).forEach(l => l.classList.add('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page + 'Page').classList.add('active');
        if (page === 'admin') { renderAdminTable(); renderAdminReviews(); }
        if (page === 'reviews') renderReviews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
        const tabId = this.dataset.tab;
        if (tabId === 'products') document.getElementById('productsPanel').classList.add('active');
        if (tabId === 'reviews-admin') document.getElementById('reviewsAdminPanel').classList.add('active');
    });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.dataset.category;
        renderStore();
    });
});

document.getElementById('searchInput').addEventListener('input', function() {
    searchTerm = this.value;
    renderStore();
});

document.getElementById('langToggle').addEventListener('click', function() {
    currentLang = currentLang === 'fr' ? 'ar' : 'fr';
    this.textContent = currentLang === 'fr' ? 'AR' : 'FR';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    const searchInput = document.getElementById('searchInput');
    searchInput.placeholder = currentLang === 'fr' ? searchInput.dataset.plFr : searchInput.dataset.plAr;
    renderStore();
    renderAdminTable();
    renderAdminReviews();
    renderReviews();
    updateCartModal();
});

document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('cartModal').classList.remove('active');
});

document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
});

document.getElementById('paypalBtn').addEventListener('click', function() {
    const info = document.getElementById('paypalInfo');
    info.style.display = info.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('codBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert(currentLang === 'fr' ? 'Votre panier est vide' : 'سلة المشتريات فارغة');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const hasPhysical = cart.some(item => item.category === 'electronique' || item.category === 'solaire');
    let message = currentLang === 'fr' ? '🛒 Nouvelle Commande - Paiement à la Livraison\n\n' : '🛒 طلب جديد - الدفع عند الاستلام\n\n';

    cart.forEach(item => {
        const name = currentLang === 'fr' ? item.name : item.nameAr;
        message += `• ${name} x${item.qty} - ${formatPrice(item.price * item.qty)}\n`;
    });

    message += `\n💰 ${currentLang === 'fr' ? 'Total' : 'المجموع'}: ${formatPrice(total)}`;
    message += `\n🚚 ${currentLang === 'fr' ? 'Livraison Gratuite' : 'توصيل مجاني'}`;
    message += `\n💵 ${currentLang === 'fr' ? 'Paiement à la livraison' : 'الدفع عند الاستلام'}`;

    if (hasPhysical) {
        const addr = document.getElementById('shippingAddress').value.trim();
        if (addr) {
            message += `\n📍 ${currentLang === 'fr' ? 'Adresse' : 'العنوان'}: ${addr}`;
        }
    }

    window.open(`https://wa.me/212665946134?text=${encodeURIComponent(message)}`, '_blank');
});

document.getElementById('whatsappOrderBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert(currentLang === 'fr' ? 'Votre panier est vide' : 'سلة المشتريات فارغة');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const hasPhysical = cart.some(item => item.category === 'electronique' || item.category === 'solaire');
    let message = currentLang === 'fr' ? '🛒 Nouvelle Commande info-essoussi\n\n' : '🛒 طلب جديد من info-essoussi\n\n';
    cart.forEach(item => {
        const name = currentLang === 'fr' ? item.name : item.nameAr;
        message += `• ${name} x${item.qty} - ${formatPrice(item.price * item.qty)}\n`;
    });
    message += `\n💰 ${currentLang === 'fr' ? 'Total' : 'المجموع'}: ${formatPrice(total)}`;
    if (hasPhysical) {
        const addr = document.getElementById('shippingAddress').value.trim();
        if (addr) {
            message += `\n📍 ${currentLang === 'fr' ? 'Adresse' : 'العنوان'}: ${addr}`;
        }
    }
    window.open(`https://wa.me/212665946134?text=${encodeURIComponent(message)}`, '_blank');
});

function openPrivacySidebar() {
    document.getElementById('privacySidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePrivacySidebar() {
    document.getElementById('privacySidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('storeReviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('storeReviewName').value;
    const rating = parseInt(document.getElementById('storeReviewRating').value);
    const text = document.getElementById('storeReviewText').value;
    const reviews = getReviews();
    reviews.unshift({
        id: Date.now(),
        name,
        nameAr: name,
        rating,
        text,
        textAr: text,
        date: new Date().toISOString().split('T')[0]
    });
    saveReviews(reviews);
    renderReviews();
    renderAdminReviews();
    this.reset();
    alert(currentLang === 'fr' ? '✅ Merci pour votre avis !' : '✅ شكراً على تقييمك!');
});

renderStore();
renderReviews();
renderAdminTable();
renderAdminReviews();

if (window.location.search.includes('admin=true')) {
    if (adminUnlocked) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('adminPage').classList.add('active');
        renderAdminTable();
        renderAdminReviews();
    } else {
        const pwd = prompt(currentLang === 'fr' ? '🔒 Mot de passe administrateur:' : '🔒 كلمة سر المسؤول:');
        if (pwd === ADMIN_PASSWORD) {
            adminUnlocked = true;
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById('adminPage').classList.add('active');
            renderAdminTable();
            renderAdminReviews();
        } else if (pwd !== null) {
            alert(currentLang === 'fr' ? 'Mot de passe incorrect' : 'كلمة السر خطأ');
        }
    }
}

document.getElementById('searchInput').placeholder = document.getElementById('searchInput').dataset.plFr || 'Rechercher un produit...';
