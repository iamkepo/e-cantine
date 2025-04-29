import { create, StateCreator } from "zustand";
import { Command, History, PlanningEvent } from '../core/types';
import { persist } from "zustand/middleware";

type HistoryStore = {
  history: History | undefined;
  commands: Command[] | undefined;
  initApp: () => void;
};

const initState = {
  history: undefined,
  commands: undefined,
  initApp: () => {},
} as HistoryStore;
const myMiddlewares = <T extends object>(f: StateCreator<T>) => persist(f, { name: 'historyStore' });

export const useHistoryStore = create<HistoryStore>()(
  myMiddlewares((set) => ({
    ...initState,
    initApp: () => set(() => initState),
  })),
);


export const getCommandsByDate = (date: string) => {
  const { commands } = useHistoryStore.getState();
  return commands?.filter(command => command.startDate.toISOString().split('T')[0] === date);
};

export const getCommandsByWeek = (week: number) => {
  const { commands } = useHistoryStore.getState();
  return commands?.filter(command => command.startDate.toISOString().split('T')[0].split('-')[1] === week.toString());
};

export const getCommandsByMonth = (month: number) => {
  const { commands } = useHistoryStore.getState();
  return commands?.filter(command => command.startDate.toISOString().split('T')[0].split('-')[0] === month.toString());
};

export const getCommandsByYear = (year: number) => {
  const { commands } = useHistoryStore.getState();
  return commands?.filter(command => command.startDate.toISOString().split('T')[0].split('-')[2] === year.toString());
};

export const getCommandsByPerson = (person: string) => {
  const { commands } = useHistoryStore.getState();
  return commands?.filter(command => command.persons.includes(person));
};

export const getCommandsByPaymentMethod = (paymentMethod: string) => {
  const { commands } = useHistoryStore.getState();
  return commands?.filter(command => command.paymentMethod === paymentMethod);
};

export const getCommandsByPromoCode = (promoCode: string) => {
  const { commands } = useHistoryStore.getState();
  return commands?.filter(command => command.promoCode === promoCode);
};

export const getCommandsByTotalPrice = (totalPrice: number) => {
  const { commands } = useHistoryStore.getState();
  return commands?.filter(command => command.total === totalPrice);
};

export const getHistoryByDate = (date: string) => {
  const { history } = useHistoryStore.getState();
  return history?.filter(event => event.date === date);
};

export const getHistoryCommand = (commandId: number) => {
  const { history } = useHistoryStore.getState();
  return history?.filter(event => event.command_id === commandId);
};

export const getHistoryByStatus = (status: string) => {
  const { history } = useHistoryStore.getState();
  return history?.filter(event => event.status === status);
};

export const getHistoryBySlot = (slot: string) => {
  const { history } = useHistoryStore.getState();
  return history?.filter(event => event.slot === slot);
};

export const createCommand = (command: Command): number => {
  const { commands } = useHistoryStore.getState();
  const newCommand = {...command, id: commands?.length || 0 + 1};
  useHistoryStore.setState({
    commands: [...(commands || []), newCommand]
  });
  return newCommand.id;
};

export const createHistory = (commandId: number, events: PlanningEvent[]) => {
  const { history } = useHistoryStore.getState();
  const newHistory = events.map(event => ({
    ...event,
    plat_id: event.id,
    command_id: commandId,
    id: history?.length || 0 + 1,
    status: 'pending'
  }));
  useHistoryStore.setState({
    history: [...(history || []), ...(newHistory as History)]
  });
};

export const updateCommand = (commandId: number, updatedCommand: unknown) => {
  const { commands } = useHistoryStore.getState();
  const updatedCommands = commands?.map(cmd => cmd.id === commandId ? updatedCommand : cmd);
  useHistoryStore.setState({
    commands: updatedCommands as Command[]
  });
};

export const updateHistory = (historyId: number, updatedHistory: unknown) => {
  const { history } = useHistoryStore.getState();
  const updatedHistoryEvents = history?.map(hist => hist.id === historyId ? updatedHistory : hist);
  useHistoryStore.setState({
    history: updatedHistoryEvents as History
  });
};

export const removeCommand = (commandId: number) => {
  const { commands } = useHistoryStore.getState();
  const updatedCommands = commands?.filter(cmd => cmd.id !== commandId);
  removeHistoryEvents(commandId);
  useHistoryStore.setState({
    commands: updatedCommands as Command[]
  });
};

export const removeHistoryEvents = (commandId: number) => {
  const { history } = useHistoryStore.getState();
  const updatedHistoryEvents = history?.filter(hist => hist.command_id !== commandId);
  useHistoryStore.setState({
    history: updatedHistoryEvents as History
  });
};

export const removeHistoryEvent = (historyId: number) => {
  const { history } = useHistoryStore.getState();
  const updatedHistoryEvents = history?.filter(hist => hist.id !== historyId);
  useHistoryStore.setState({
    history: updatedHistoryEvents as History
  });
};
