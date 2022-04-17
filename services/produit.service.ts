export interface Produit {
  nom: string;
  prix: number;
  quantite: number;
}

class ProduitService {
  private produits: Array<Produit> = [];

  // Return all produits asynchronously. Returns a Promise
  getAll(): Promise<Array<Produit>> {
    return new Promise((resolve) => {
      resolve(this.produits);
    });
  }

  add(nom: string, prix: number) {
    // Add new Produit at beginning of array
    this.produits = [{ nom, prix, quantite: 1 }, ...this.produits];
  }

  remove(nom: string) {
    // Keep only Produits that don't have nom as key
    this.produits = this.produits.filter(
      (produit: Produit) => produit.nom !== nom
    );
  }
}

export default new ProduitService();
