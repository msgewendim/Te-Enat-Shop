import { useMutation } from "@tanstack/react-query";
import { useState } from 'react';

import { DesignProductFormData } from '../../components/layout/modals/DesignProduct';
import { EarlyAdoptersFormData } from '../../components/layout/modals/EarlyAdapters';
import { addEarlyAdapter, addDesignProduct , addToNewsletter, NewsLetterData } from '../../providers/api';

export const useFormUserData = () => {
  const [formData, setFormData] = useState<EarlyAdoptersFormData | DesignProductFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: EarlyAdoptersFormData | DesignProductFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
        if ('street' in data) {
        await addEarlyAdapter(data);
        } else {
        await addDesignProduct(data);
      }
      setSuccess(true);
    } catch (err) {
      setError('Submission failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    success,
    handleSubmit,
  };
};

function useEarlyAdapters() {
    return useMutation({
        mutationFn: (formData : EarlyAdoptersFormData) => addEarlyAdapter(formData),
        onSuccess: (data) => {
            console.log("Payment form fetched successfully", data);
        },
        onError: (error) => {
            console.error("Failed to fetch payment form", error);
        },
        onSettled: () => {
            console.log("Mutation finished");
        },
    });   
}

function useDesignProducts() {
    return useMutation({
        mutationFn: (formData : DesignProductFormData) => addDesignProduct(formData),
        onSuccess: (data) => {
            console.log("Payment form fetched successfully", data);
        },
        onError: (error) => {
            console.error("Failed to fetch payment form", error);
        },
        onSettled: () => {
            console.log("Mutation finished");
        },
    });   
}
function useNewsletter() {
    return useMutation({
        mutationFn: (formData : NewsLetterData) => addToNewsletter(formData),
        onSuccess: (data) => {
            console.log("Payment form fetched successfully", data);
        },
        onError: (error) => {
            console.error("Failed to fetch payment form", error);
        },
        onSettled: () => {
            console.log("Mutation finished");
        },
    });   
}

export {useNewsletter , useEarlyAdapters, useDesignProducts};