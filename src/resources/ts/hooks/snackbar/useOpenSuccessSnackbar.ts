import { useQuery } from "@tanstack/react-query";

const useOpenSuccessSnackbar = () => {
    return useQuery(["openSnackbar"], {
        enabled: false,
        initialData: null,
    });
};

export default useOpenSuccessSnackbar;
