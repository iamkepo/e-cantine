// src/store/planning.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, PlanningDay } from "@/core/types";
import { Slot } from "@/enums";


export interface PlanningState {
  startDate: string; // ISO string
  endDate: string; // ISO string
  planningItems: CartItem[];
  
  setPeriod: (startDate: string, endDate: string) => void;
  addPlanningItem: (item: CartItem) => void;
  removePlanningItem: (articleId: number, date: Date, slot: Slot) => void;
  updatePlanningItem: (articleId: number, updates: Partial<CartItem>) => void;
  getPlanningForDay: (date: Date) => Record<Slot, CartItem[]>;
  getPlanningByDay: () => PlanningDay[];
  isPlanningComplete: () => boolean;
  clearPlanning: () => void;
}

export const usePlanningStore = create<PlanningState>()(
  persist(
    (set, get) => ({
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Default 1 week
      planningItems: [],
      
      // Set planning period
      setPeriod: (startDate, endDate) => set({ startDate, endDate }),
      
      // Add an item to the planning
      addPlanningItem: (item) => set(state => {
        const existingItemIndex = state.planningItems.findIndex(
          i => i.articleId === item.articleId && i.date === item.date && i.slot === item.slot
        );
        
        if (existingItemIndex > -1) {
          const newItems = [...state.planningItems];
          newItems[existingItemIndex].quantity += item.quantity;
          return { planningItems: newItems };
        }
        
        return { planningItems: [...state.planningItems, { 
          ...item, 
          id: state.planningItems.length + 1 
        }] };
      }),
      
      // Remove an item from the planning
      removePlanningItem: (articleId, date, slot) => set(state => ({
        planningItems: state.planningItems.filter(item => item.articleId !== articleId && item.date !== date && item.slot !== slot)
      })),
      
      // Update a planning item
      updatePlanningItem: (articleId, updates) => set(state => ({
        planningItems: state.planningItems.map(item =>
          item.articleId === articleId ? { ...item, ...updates } : item
        )
      })),
      
      // Get planning items for a specific day organized by slots
      getPlanningForDay: (date: Date) => {
        const items = get().planningItems.filter(item => item.date === date);
        const result = {
          [Slot.Breakfast]: [] as CartItem[],
          [Slot.Lunch]: [] as CartItem[],
          [Slot.Dinner]: [] as CartItem[],
          [Slot.Snack]: [] as CartItem[]
        };
        
        items.forEach(item => {
          result[item.slot].push(item);
        });
        
        return result;
      },
      
      // Get planning items organized by days
      getPlanningByDay: () => {
        const { startDate, endDate, planningItems } = get();
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days: PlanningDay[] = [];
        
        // Create array of days between start and end dates
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          days.push({
            date: d,
            meals: {
              [Slot.Breakfast]: planningItems.filter(item => item.date === d && item.slot === Slot.Breakfast),
              [Slot.Lunch]: planningItems.filter(item => item.date === d && item.slot === Slot.Lunch),
              [Slot.Dinner]: planningItems.filter(item => item.date === d && item.slot === Slot.Dinner),
              [Slot.Snack]: planningItems.filter(item => item.date === d && item.slot === Slot.Snack)
            }
          });
        }
        
        return days;
      },
      
      // Check if planning is complete for all days and required slots
      isPlanningComplete: () => {
        const days = get().getPlanningByDay();
        // Require breakfast, lunch, and dinner for each day
        return days.every(day => 
          day.meals[Slot.Breakfast].length > 0 && 
          day.meals[Slot.Lunch].length > 0 && 
          day.meals[Slot.Dinner].length > 0
          // Snack is optional
        );
      },
      
      // Clear planning
      clearPlanning: () => set({ planningItems: [] })
    }),
    {
      name: "e-cantine-planning", // storage key
      version: 1 // version for migration management
    }
  )
);