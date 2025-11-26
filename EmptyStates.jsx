import React from 'react';

/**
 * ALFAI ERP - Empty States
 * Professional empty state designs for all scenarios
 */

// 1. GENERIC EMPTY STATE
export const EmptyState = ({
  icon = '📭',
  title = 'Henüz veri yok',
  description = 'Burası şu anda boş görünüyor.',
  action,
  actionLabel = 'Başla'
}) => (
  <div style={{
    textAlign: 'center',
    padding: '60px 20px',
    maxWidth: '400px',
    margin: '0 auto'
  }}>
    <div style={{ fontSize: '64px', marginBottom: '24px' }}>{icon}</div>
    <h3 style={{
      margin: '0 0 12px 0',
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937'
    }}>
      {title}
    </h3>
    <p style={{
      margin: '0 0 32px 0',
      fontSize: '15px',
      color: '#6b7280',
      lineHeight: '1.6'
    }}>
      {description}
    </p>
    {action && (
      <button
        onClick={action}
        style={{
          padding: '12px 32px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        {actionLabel}
      </button>
    )}
  </div>
);

// 2. NO RESULTS FOUND
export const NoResults = ({ searchTerm, onClear }) => (
  <EmptyState
    icon="🔍"
    title="Sonuç bulunamadı"
    description={`"${searchTerm}" için hiçbir sonuç bulunamadı. Farklı bir terim deneyin.`}
    action={onClear}
    actionLabel="Aramayı Temizle"
  />
);

// 3. NO QUOTES
export const NoQuotes = ({ onCreate }) => (
  <EmptyState
    icon="📝"
    title="Henüz teklif yok"
    description="İlk teklifinizi oluşturun ve müşterilerinize profesyonel teklifler gönderin."
    action={onCreate}
    actionLabel="+ İlk Teklifi Oluştur"
  />
);

// 4. NO INVOICES
export const NoInvoices = ({ onCreate }) => (
  <EmptyState
    icon="🧾"
    title="Henüz fatura yok"
    description="Tekliflerinizi faturaya dönüştürün veya doğrudan fatura oluşturun."
    action={onCreate}
    actionLabel="+ Fatura Oluştur"
  />
);

// 5. NO CUSTOMERS
export const NoCustomers = ({ onCreate }) => (
  <EmptyState
    icon="👥"
    title="Müşteri listeniz boş"
    description="İlk müşterinizi ekleyin ve onlara teklif göndermeye başlayın."
    action={onCreate}
    actionLabel="+ Müşteri Ekle"
  />
);

// 6. NO PRODUCTS
export const NoProducts = ({ onCreate }) => (
  <EmptyState
    icon="📦"
    title="Ürün kataloğu boş"
    description="Ürünlerinizi ekleyin ve tekliflerinizde kullanmaya başlayın."
    action={onCreate}
    actionLabel="+ Ürün Ekle"
  />
);

// 7. NO PAYMENTS
export const NoPayments = () => (
  <EmptyState
    icon="💳"
    title="Henüz ödeme yok"
    description="Ödeme aldığınızda burada görünecek. İlk ödemenizi bekliyoruz! 🎉"
  />
);

// 8. NO NOTIFICATIONS
export const NoNotifications = () => (
  <EmptyState
    icon="🔔"
    title="Bildirim yok"
    description="Yeni bir bildirim geldiğinde burada görünecek."
  />
);

// 9. NO SUBSCRIPTIONS
export const NoSubscriptions = ({ onUpgrade }) => (
  <EmptyState
    icon="⭐"
    title="Premium özellikler"
    description="Bu özelliğe erişmek için planınızı yükseltin ve daha fazlasını keşfedin."
    action={onUpgrade}
    actionLabel="Planı Yükselt"
  />
);

// 10. COMING SOON
export const ComingSoon = ({ feature = 'Bu özellik' }) => (
  <EmptyState
    icon="🚀"
    title="Yakında geliyor!"
    description={`${feature} çok yakında kullanıma sunulacak. Bizi takip edin!`}
  />
);

// 11. ERROR STATE
export const ErrorState = ({ onRetry }) => (
  <EmptyState
    icon="⚠️"
    title="Bir şeyler yanlış gitti"
    description="Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
    action={onRetry}
    actionLabel="Tekrar Dene"
  />
);

// 12. MAINTENANCE
export const Maintenance = () => (
  <EmptyState
    icon="🔧"
    title="Bakım çalışması"
    description="Bu özellik şu anda bakımdadır. Kısa süre içinde tekrar deneyin."
  />
);

// 13. PERMISSION DENIED
export const PermissionDenied = () => (
  <EmptyState
    icon="🔒"
    title="Erişim reddedildi"
    description="Bu içeriği görüntülemek için yeterli izniniz yok."
  />
);

// 14. EXPIRED TRIAL
export const ExpiredTrial = ({ onUpgrade }) => (
  <EmptyState
    icon="⏰"
    title="Deneme süreniz doldu"
    description="Deneme süreniz sona erdi. Kullanmaya devam etmek için bir plan seçin."
    action={onUpgrade}
    actionLabel="Plan Satın Al"
  />
);

// 15. OFFLINE
export const Offline = () => (
  <EmptyState
    icon="📡"
    title="İnternet bağlantısı yok"
    description="Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin."
  />
);

// 16. CUSTOM EMPTY STATE WITH IMAGE
export const EmptyStateWithIllustration = ({
  illustrationUrl,
  title,
  description,
  action,
  actionLabel
}) => (
  <div style={{
    textAlign: 'center',
    padding: '60px 20px',
    maxWidth: '500px',
    margin: '0 auto'
  }}>
    {illustrationUrl && (
      <img
        src={illustrationUrl}
        alt="Empty state"
        style={{ maxWidth: '240px', marginBottom: '32px' }}
      />
    )}
    <h3 style={{
      margin: '0 0 12px 0',
      fontSize: '22px',
      fontWeight: '700',
      color: '#1f2937'
    }}>
      {title}
    </h3>
    <p style={{
      margin: '0 0 32px 0',
      fontSize: '16px',
      color: '#6b7280',
      lineHeight: '1.6'
    }}>
      {description}
    </p>
    {action && (
      <button
        onClick={action}
        style={{
          padding: '14px 40px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
        }}
      >
        {actionLabel}
      </button>
    )}
  </div>
);

// EXPORT ALL
export default {
  EmptyState,
  NoResults,
  NoQuotes,
  NoInvoices,
  NoCustomers,
  NoProducts,
  NoPayments,
  NoNotifications,
  NoSubscriptions,
  ComingSoon,
  ErrorState,
  Maintenance,
  PermissionDenied,
  ExpiredTrial,
  Offline,
  EmptyStateWithIllustration
};
