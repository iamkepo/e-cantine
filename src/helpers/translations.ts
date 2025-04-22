export const translations: { [key: string]: { [lang: string]: string } } = {
  HomePage_title: {
    fr: 'Tableau de Bord',
    en: 'Dashboard',
  },
  NoMatch_title: {
    fr: 'Page non trouvée',
    en: '404 not found',
  },
  NoMatch_btn: {
    fr: 'Accueil',
    en: 'Home',
  },
  CartView_title: {
    fr: 'Panier',
    en: 'Shopping Cart',
  },
  CartView_validate_btn: {
    fr: 'Valider le panier',
    en: 'Validate Cart',
  },
  CartView_empty: {
    fr: 'Votre panier est vide.',
    en: 'Your cart is empty.',
  },
  PlannerView_title: {
    fr: 'Calendrier',
    en: 'Planning',
  },
  PlannerView_next_btn: {
    fr: 'Suivant',
    en: 'Next',
  },
  PlannerView_back_btn: {
    fr: 'Retour',
    en: 'Back',
  },
  PlannerView_empty: {
    fr: 'Aucun événement planifié.',
    en: 'No planned events.',
  },
  CheckoutView_title: {
    fr: 'Paiement',
    en: 'Checkout',
  },
  CheckoutView_pay_btn: {
    fr: 'Payer',
    en: 'Pay',
  },
  CheckoutView_success: {
    fr: 'Paiement réussi !',
    en: 'Payment successful!',
  },
  CheckoutView_thank_you: {
    fr: 'Merci pour votre achat. Votre planning est confirmé.',
    en: 'Thank you for your purchase. Your planning is confirmed.',
  },
  CategoryView_title: {
    fr: 'Catégories',
    en: 'Categories',
  },
  CategoryView_empty: {
    fr: 'Aucun article dans cette catégorie.',
    en: 'No items in this category.',
  },
  LoginView_title: {
    fr: 'Connexion',
    en: 'Login',
  },
  LoginView_btn: {
    fr: 'Se connecter',
    en: 'Login',
  },
  ConfigLayout_title: {
    fr: 'Configuration',
    en: 'Configuration',
  },
  DashboardView_title: {
    fr: 'Mon Tableau de Bord',
    en: 'My Dashboard',
  },
  DashboardView_subscription: {
    fr: "Pas d'abonnement en cours.",
    en: "No active subscription.",
  },
  // Stepper / étapes
  Stepper_cart: { fr: 'Panier', en: 'Cart' },
  Stepper_planning: { fr: 'Plannification', en: 'Planning' },
  Stepper_checkout: { fr: 'Paiement', en: 'Checkout' },
  Stepper_confirm: { fr: 'Confirmation', en: 'Confirmation' },

  // Actions génériques
  action_back: { fr: 'Retour', en: 'Back' },
  action_next: { fr: 'Suivant', en: 'Next' },
  action_validate: { fr: 'Valider', en: 'Validate' },
  action_remove: { fr: 'Retirer', en: 'Remove' },
  action_add: { fr: 'Ajouter', en: 'Add' },
  action_edit: { fr: 'Modifier', en: 'Edit' },
  action_confirm: { fr: 'Confirmer', en: 'Confirm' },
  action_cancel: { fr: 'Annuler', en: 'Cancel' },

  // Form labels
  form_email: { fr: 'Adresse e-mail', en: 'Email address' },
  form_password: { fr: 'Mot de passe', en: 'Password' },
  form_name: { fr: 'Nom', en: 'Name' },
  form_firstname: { fr: 'Prénom', en: 'First name' },
  form_lastname: { fr: 'Nom de famille', en: 'Last name' },
  form_phone: { fr: 'Téléphone', en: 'Phone' },
  form_address: { fr: 'Adresse', en: 'Address' },
  form_promo: { fr: 'Code promo', en: 'Promo code' },
  form_search: { fr: 'Rechercher', en: 'Search' },

  // Notifications & états
  notif_saved: { fr: 'Enregistré avec succès', en: 'Saved successfully' },
  notif_deleted: { fr: 'Supprimé avec succès', en: 'Deleted successfully' },
  notif_error: { fr: 'Une erreur est survenue', en: 'An error occurred' },
  notif_empty: { fr: 'Aucun résultat trouvé', en: 'No results found' },
  notif_required: { fr: 'Champ requis', en: 'Required field' },
  notif_invalid_email: { fr: 'Adresse e-mail invalide', en: 'Invalid email address' },

  // Checkout/Order
  order_summary: { fr: 'Récapitulatif', en: 'Order Summary' },
  order_total: { fr: 'Total', en: 'Total' },
  order_subtotal: { fr: 'Sous-total', en: 'Subtotal' },
  order_shipping: { fr: 'Livraison', en: 'Shipping' },
  order_tax: { fr: 'Taxe', en: 'Tax' },
  order_transport: { fr: 'Transport', en: 'Transport' },
  order_persons: { fr: 'Nombre de personnes', en: 'Number of persons' },
  order_days: { fr: 'Nombre de jours', en: 'Number of days' },
  order_events: { fr: 'Nombre d\'événements', en: 'Number of events' },
  order_apply: { fr: 'Appliquer', en: 'Apply' },
  order_proceed: { fr: 'Procéder au paiement', en: 'Proceed to Checkout' },

  // Confirmation
  confirm_title: { fr: 'Confirmation', en: 'Confirmation' },
  confirm_message: { fr: 'Êtes-vous sûr ?', en: 'Are you sure?' },
  confirm_yes: { fr: 'Oui', en: 'Yes' },
  confirm_no: { fr: 'Non', en: 'No' },

  // Empty states
  empty_cart: { fr: 'Votre panier est vide.', en: 'Your cart is empty.' },
  empty_planning: { fr: 'Aucun événement planifié.', en: 'No planned events.' },
  empty_category: { fr: 'Aucun article dans cette catégorie.', en: 'No items in this category.' },
  empty_dashboard: { fr: 'Aucune donnée à afficher.', en: 'No data to display.' },
  empty_search: { fr: 'Aucun résultat trouvé.', en: 'No results found.' },

  // Erreurs
  error_404: { fr: 'Page non trouvée', en: 'Page not found' },
  error_generic: { fr: 'Une erreur est survenue.', en: 'An error occurred.' },
  error_network: { fr: 'Erreur réseau', en: 'Network error' },
  error_required: { fr: 'Ce champ est requis', en: 'This field is required' },
  error_invalid: { fr: 'Valeur invalide', en: 'Invalid value' },
};
