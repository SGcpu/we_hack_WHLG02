// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all search inputs and buttons
    const searchInputs = document.querySelectorAll('input[placeholder="Search legal topics..."]');
    const searchButtons = document.querySelectorAll('button.text-gray-400.hover\\:text-indigo-300');
    
    // Array of searchable pages and their content topics
    const searchableContent = [
        { 
            title: 'Legal Rights Overview', 
            url: 'legalguides.html', 
            keywords: 'rights fundamental legal constitution citizen freedom human rights' 
        },
        { 
            title: 'Criminal Law Basics', 
            url: 'legalguides.html#criminal', 
            keywords: 'criminal law fir police arrest bail rights procedure' 
        },
        { 
            title: 'Cyber Security', 
            url: 'legalguides.html#family', 
            keywords: 'family marriage divorce adoption child custody maintenance' 
        },
        { 
            title: 'Property Law Explained', 
            url: 'legalguides.html#property', 
            keywords: 'property ownership land registration sale lease tenant landlord' 
        },
        { 
            title: 'Contract Laws', 
            url: 'legalguides.html#contract', 
            keywords: 'contract agreement legal binding breach remedy business' 
        },
        { 
            title: 'File an FIR', 
            url: 'https://mumbaipolice.gov.in/OnlineComplaints?', 
            keywords: 'fir police report complaint crime emergency procedure' 
        },
        { 
            title: 'Legal Quiz: Know Your Rights', 
            url: 'QT.html#rights-quiz', 
            keywords: 'quiz test knowledge rights assessment legal' 
        },
        { 
            title: 'Ask a Lawyer Service', 
            url: 'askalawyer.html', 
            keywords: 'lawyer consultation advice legal help professional' 
        }
    ];
    
    // Function to perform search
    function performSearch(query) {
        query = query.toLowerCase().trim();
        if (!query) return [];
        
        return searchableContent.filter(item => {
            return item.title.toLowerCase().includes(query) || 
                   item.keywords.toLowerCase().includes(query);
        });
    }
    
    // Function to display search results
    function displaySearchResults(results, inputElement) {
        // Remove any existing search results container
        const existingResults = document.getElementById('searchResults');
        if (existingResults) existingResults.remove();
        
        // Don't show empty results if the input is empty
        if (inputElement.value.trim() === '') return;
        
        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'searchResults';
        resultsContainer.className = 'absolute z-50 mt-2 w-full bg-card-bg rounded-lg shadow-lg max-h-80 overflow-y-auto';
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'px-4 py-3 text-text-secondary';
            noResults.textContent = 'No results found';
            resultsContainer.appendChild(noResults);
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('a');
                resultItem.href = result.url;
                resultItem.className = 'block px-4 py-3 hover:bg-card-hover text-text-primary hover:text-primary-light transition-colors';
                resultItem.textContent = result.title;
                resultsContainer.appendChild(resultItem);
            });
        }
        
        // Append to input's parent
        inputElement.parentNode.appendChild(resultsContainer);
    }
    
    // Add event listeners to search inputs
    searchInputs.forEach(input => {
        // Search as you type with debounce
        let debounceTimer;
        input.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const results = performSearch(this.value);
                displaySearchResults(results, this);
            }, 300); // 300ms debounce
        });
        
        // Also keep the Enter key functionality
        input.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                const results = performSearch(this.value);
                displaySearchResults(results, this);
            }
        });
        
        // Clear results when input loses focus
        input.addEventListener('blur', function() {
            // Delay removal to allow clicking on results
            setTimeout(() => {
                const results = document.getElementById('searchResults');
                if (results) results.remove();
            }, 200);
        });
        
        // Show results when input is focused if it has a value
        input.addEventListener('focus', function() {
            if (this.value.trim() !== '') {
                const results = performSearch(this.value);
                displaySearchResults(results, this);
            }
        });
    });
    
    // Add event listeners to search buttons
    searchButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const input = searchInputs[index];
            const results = performSearch(input.value);
            displaySearchResults(results, input);
        });
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        const searchContainer = event.target.closest('.relative');
        const isSearchInput = event.target.placeholder === "Search legal topics...";
        const isSearchButton = event.target.closest('button.text-gray-400.hover\\:text-indigo-300');
        
        if (!isSearchInput && !isSearchButton && !searchContainer) {
            const results = document.getElementById('searchResults');
            if (results) results.remove();
        }
    });
});