import { useMutation } from "@tanstack/react-query";

import { DesignProductFormData } from '../../components/layout/modals/DesignProduct';
import { EarlyAdoptersFormData } from '../../components/layout/modals/EarlyAdapters';
import { addEarlyAdapter, addDesignProduct, addToNewsletter, NewsLetterData } from '../../lib';

function useEarlyAdapters() {
    return useMutation({
        mutationFn: (formData: EarlyAdoptersFormData) => addEarlyAdapter(formData),
        onSuccess: (data) => {
            console.log("Early adapter form submitted successfully", data);
        },
        onError: (error) => {
            console.error("Failed to submit early adapter form", error);
        },
        onSettled: () => {
            console.log("Early adapter mutation finished");
        },
    });   
}

function useDesignProducts() {
    return useMutation({
        mutationFn: (formData: DesignProductFormData) => addDesignProduct(formData),
        onSuccess: (data) => {
            console.log("Design product form submitted successfully", data);
        },
        onError: (error) => {
            console.error("Failed to submit design product form", error);
        },
        onSettled: () => {
            console.log("Design product mutation finished");
        },
    });   
}

function useNewsletter() {
    return useMutation({
        mutationFn: (formData: NewsLetterData) => addToNewsletter(formData),
        onSuccess: (data) => {
            console.log("Newsletter form submitted successfully", data);
        },
        onError: (error) => {
            console.error("Failed to submit newsletter form", error);
        },
        onSettled: () => {
            console.log("Newsletter mutation finished");
        },
    });   
}

export { useNewsletter, useEarlyAdapters, useDesignProducts }; 