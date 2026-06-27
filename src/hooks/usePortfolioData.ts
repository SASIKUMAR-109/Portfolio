import { useState } from 'react';
import { PortfolioData } from '../types';
import { defaultPortfolioData } from '../data/defaultData';

export function usePortfolioData() {
    const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);

    const updateData = async (newData: Partial<PortfolioData>) => {
        const updatedData = { ...data, ...newData };
        setData(updatedData as PortfolioData);
        return true;
    };

    const initializeData = async () => {
        setData(defaultPortfolioData);
        return true;
    };

    return { data, loading, error, updateData, initializeData };
}
