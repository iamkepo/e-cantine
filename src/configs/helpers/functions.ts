export const statusLabel = (statut: string) => {
  switch (statut) {
    case 'ACTIF':
      return 'Actif';
      
    case 'EN_ATTENTE':
      return 'En attente';

    case 'DESACTIVE':
      return 'Désactivé';
   
    case 'VALIDE':
      return 'Validé';
      
    default:
      return 'Inconnu';
  }
};