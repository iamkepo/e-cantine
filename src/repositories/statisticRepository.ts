import { IStatistics } from "@/core/interfaces";
import { SetData } from "@/core/types";
import StatisticsService from "@/services/statisticsService";
import * as yup from 'yup';

export default class StatisticRepository extends StatisticsService {
  constructor(setStatistic: SetData<IStatistics>) {
    super(setStatistic);
  }

  // Table configuration (if needed for displaying statistics in a table)
  tableHeadStatistic = [
    { id: 'totalClients', label: 'Total Clients' },
    { id: 'totalSubscriptions', label: 'Total Subscriptions' },
    { id: 'totalArticles', label: 'Total Articles' },
    { id: 'totalDeliveries', label: 'Total Deliveries' },
    { id: 'totalTransactions', label: 'Total Transactions' },
    { id: 'revenue.total', label: 'Total Revenue' },
    { id: 'revenue.monthly', label: 'Monthly Revenue' },
    { id: 'revenue.weekly', label: 'Weekly Revenue' },
    { id: 'revenue.daily', label: 'Daily Revenue' },
  ]

  // Filter configuration
  filterStatistic = {
    startDate: new Date(),
    endDate: new Date(),
  }

  // Form methods
  formFilterStatistic() {
    return [
      { id: "startDate", type: "date", label: "Date de début", required: true, colSize: "col-12 col-md-6" },
      { id: "endDate", type: "date", label: "Date de fin", required: true, colSize: "col-12 col-md-6" },
    ]
  }

  // Validation schemas
  statisticFilterSchema = yup.object({
    startDate: yup.date().required('Date de début est requise'),
    endDate: yup.date().required('Date de fin est requise').min(yup.ref('startDate'), 'La date de fin doit être après la date de début'),
  })
}