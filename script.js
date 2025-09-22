// Data produk
const products = {
    1: { name: "Jam Tangan Minimalis", price: 1250000, image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Fashionable minimalist wristwatch with leather strap and silver case&id=prod1" },
    2: { name: "Tas Desainer Premium", price: 2850000, image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Designer leather handbag in classic black color with gold hardware&id=prod2" },
    3: { name: "Kacamata Premium", price: 850000, image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Premium sunglasses with gold frame and dark lenses&id=prod3" },
    4: { name: "Dompet Kulit Modern", price: 650000, image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Modern leather wallet with multiple card slots and coin compartment&id=prod4" },
    5: { name: "Kalung Mutiara", price: 1750000, image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Elegant pearl necklace with silver chain and clasp&id=prod5" },
    6: { name: "Lampu Meja Modern", price: 950000, image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Modern desk lamp with brass finish and adjustable arm&id=prod6" }
};

// Keranjang belanja
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Fungsi untuk scroll ke section produk
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId) {
    const product = products[productId];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} ditambahkan ke keranjang!`);
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
    // Update counter
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
    
    // Update total
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `Rp ${formatCurrency(cartTotal)}`;
    
    // Update items di modal
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Keranjang belanja kosong</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-price">Rp ${formatCurrency(item.price)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Fungsi untuk menampilkan keranjang
function showCart() {
    document.getElementById('cartModal').style.display = 'block';
    updateCart();
}

// Fungsi untuk menutup keranjang
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Fungsi untuk checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }
    
    alert(`Terima kasih! Pesanan Anda dengan total Rp ${formatCurrency(cartTotal)} telah diterima.`);
    cart = [];
    updateCart();
    closeCart();
}

// Fungsi untuk format currency
function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transition: transform 0.3s ease, opacity 0.3s ease;
        transform: translateX(100%);
        opacity: 0;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cart icon click
    document.getElementById('cartIcon').addEventListener('click', showCart);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('cartModal');
        if (event.target === modal) {
            closeCart();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
