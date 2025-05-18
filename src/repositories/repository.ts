/* eslint-disable @typescript-eslint/no-explicit-any */
class Repository<T> {
  setArticles?: (articles: T[]) => void;

  constructor(setArticles?: (articles: T[]) => void) {
    if (setArticles) {
      this.setArticles = setArticles;
    }
  }


  async fetchAll(callfront: () => Promise<T[]>): Promise<void | T[]> {
    try {
      const data = await callfront();
      if (this.setArticles) {
        this.setArticles(data);
      } else {
        return data;
      }

    } catch (error) {
      console.error("Erreur fetchAll :", error);
      throw error;
    }
  }

  async fetchOne(callfront: (id: number) => Promise<T>, id: number): Promise<T> {
    try {
      const data = await callfront(id);
      return data;
    } catch (error) {
      console.error("Erreur fetchOne :", error);
      throw error;
    }
  }

  async create(callfront: (payload: T) => Promise<T>, payload: T): Promise<T> {
    try {
      const data = await callfront(payload);
      return data;
    } catch (error) {
      console.error("Erreur create :", error);
      throw error;
    }
  }

  async patch(callfront: (id: number, payload: {attr: string, val: any}) => Promise<T>, id: number, payload: {attr: string, val: any}): Promise<T> {
    try {
      const data = await callfront(id, payload);
      return data;
    } catch (error) {
      console.error("Erreur patch :", error);
      throw error;
    }
  }

  async update(callfront: (id: number, payload: T) => Promise<T>, id: number, payload: T): Promise<T> {
    try {
      const data = await callfront(id, payload);
      return data;
    } catch (error) {
      console.error("Erreur update :", error);
      throw error;
    }
  }

  async delete(callfront: (id: number) => Promise<T>, id: number): Promise<T> {
    try {
      const data = await callfront(id);
      return data;
    } catch (error) {
      console.error("Erreur delete :", error);
      throw error;
    }
  }

}

export default Repository;
