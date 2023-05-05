// Format input into textareas so that it behaves more like an IDE. Textarea should 
// recognize tabs, recognize when behaviour is altered with or alt shift keys
// and recognize when the cursor shifts to the next line.
export function formatTextAreaOnKeyDown(event, setters: Setters) {
    const { setFormValues } = setters;
    const { name, value } = event.target;
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    if (event.key === "Tab" && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        event.target.selectionStart = event.target.selectionEnd = start + 1;
        setFormValues((prev) => ({      
            ...prev, 
            [name]: `${value.substring(0, start)}\t${value.substring(end)}`
        }));
    }
    if (event.key === "Enter") {
        event.preventDefault();
        event.target.selectionEnd = end + 2; 
        setFormValues((prev) => ({      
            ...prev, 
            [name]: `${value.substring(0, start)}\n\t${value.substring(end)}`
        }));
    }
}

// Update the form on input of any input field
// and handle updating error state
export function updateFormOnInput(event, setters: Setters) {
    const { setIsError, setFormValues } = setters;
    const { name, value } = event.target;
    setIsError(false);
    setFormValues((prev) => ({ 
        ...prev, 
        [name]: value 
    }));
}

export function insertSampleInput(event, setters: Setters, key, sample) {
    const { setIsError, setFormValues } = setters;
    event.preventDefault();
    setIsError(false);
    setFormValues((prev) => ({      
        ...prev, 
        [key]: JSON.stringify(sample, null, 2)
    }));
}

// Submit the form and set a loading state, success state, 
// and error state based on response from the server
export async function submitForm(event, setters: Setters, request: Request, ) {
    const { endpoint, method, body } = request;
    const { setIsLoading, setIsSuccess, setIsError } = setters;
    event.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    try {
        const response = await fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body
        });
        if (!response.ok) {
            setIsError(true)
            throw new Error(`Request failed with ${response.status}.`);
        }
        setIsSuccess(true);
    } catch (e) {
        setIsError(true)
        throw new Error(e);
    } finally {
        setIsLoading(false);
    }
}
export type Request = { endpoint, method, body };
export type Setters = { setIsLoading?, setIsSuccess?, setIsError?, setFormValues? };
