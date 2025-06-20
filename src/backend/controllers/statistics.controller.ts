/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticlesModel from "@/backend/models/articles.model";
import CommandsModel from "@/backend/models/commands.model";
import DeliveriesModel from "@/backend/models/deliveries.model";
import UsersModel from "@/backend/models/users.model";

const statisticsController = {
  getStatistics: async () => {
    try {
      const articles = await new ArticlesModel().count({});
      const commands = await new CommandsModel().count({});
      const deliveries = await new DeliveriesModel().count({});
      const users = await new UsersModel().count({});
      
      const stats = [
        { label: 'articles', value: articles },
        { label: 'commandes', value: commands },
        { label: 'livraisons', value: deliveries },
        { label: 'utilisateurs', value: users },
      ];
      return new Response(JSON.stringify({ data: stats }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Statistics not found: ${error}` }), { status: 500 });
    }
  },
};

export default statisticsController;
