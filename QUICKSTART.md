# ⚡ ALFAI ERP - 5 Dakikalık Başlangıç

## 🎯 En Hızlı Kurulum

### 1️⃣ Projeyi İndir (30 saniye)
```bash
git clone https://github.com/yourusername/alfai-erp.git
cd alfai-erp
```

### 2️⃣ Veritabanını Hazırla (1 dakika)
```bash
# PostgreSQL başlat
brew services start postgresql  # macOS
sudo service postgresql start    # Linux

# Database oluştur
createdb alfai_erp

# Schema yükle
psql alfai_erp < backend/database.sql

# Demo data (opsiyonel)
cd backend && node seeders/demoData.js
```

### 3️⃣ Backend Başlat (1 dakika)
```bash
cd backend
npm install
cp .env.example .env
# .env dosyasını düzenle (aşağıya bak)
npm run dev
```

### 4️⃣ Frontend Başlat (1 dakika)
```bash
# Yeni terminal
cd frontend
npm install
npm start
```

### 5️⃣ Tarayıcıda Aç (30 saniye)
```
http://localhost:3000
```

---

## 🔑 Minimum .env Yapılandırması

**backend/.env**
```env
PORT=5000
DATABASE_URL=postgresql://localhost:5432/alfai_erp
JWT_SECRET=your-secret-key-change-this
FRONTEND_URL=http://localhost:3000
```

**frontend/.env**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 Demo Hesapları

E�er demo data seed ettiyseniz:

```
Email: demo@demo.com
Password: demo123
URL: http://demo.localhost:3000
```

---

## 🆘 Yaygın Sorunlar

**PostgreSQL bağlanamıyor?**
```bash
# PostgreSQL çalışıyor mu kontrol et
psql --version
brew services list  # macOS

# Çalışmıyorsa başlat
brew services start postgresql
```

**Port 5000 kullanımda?**
```bash
# Farklı port kullan
PORT=5001 npm run dev
```

**node_modules hatası?**
```bash
# Temizle ve yeniden yükle
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Daha Fazla Bilgi

- [Full README](README.md)
- [API Documentation](docs/API.md)
- [User Guide](docs/USER_GUIDE.md)

---

**🎉 Başarılar! Artık geliştirmeye başlayabilirsiniz!**
