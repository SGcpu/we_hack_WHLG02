<script>
        document.addEventListener('DOMContentLoaded', function() {
            // Get DOM elements
            const pincodeInput = document.getElementById('pincode-input');
            const searchButton = document.getElementById('search-button');
            const loadingIndicator = document.querySelector('.loading');
            const resultsTable = document.getElementById('results-table');
            const errorMessage = document.getElementById('error-message');
            const lawyersTableBody = document.getElementById('lawyers-table-body');
            const infoMessage = document.querySelector('.info-message');
            
            // Function to fetch lawyers by pincode
            async function fetchLawyers(pincode) {
                // Show loading, hide results and error
                loadingIndicator.style.display = 'block';
                resultsTable.style.display = 'none';
                errorMessage.style.display = 'none';
                infoMessage.style.display = 'none';
                
                try {
                    // Make API request
                    const response = await fetch(`/lawyers?pincode=${pincode}`);
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    
                    const data = await response.json();
                    
                    // Hide loading
                    loadingIndicator.style.display = 'none';
                    
                    // If no lawyers found
                    if (data.length === 0) {
                        errorMessage.style.display = 'block';
                        return;
                    }
                    
                    // Display results
                    displayLawyers(data);
                    resultsTable.style.display = 'block';
                    
                } catch (error) {
                    console.error('Error fetching lawyers:', error);
                    loadingIndicator.style.display = 'none';
                    errorMessage.textContent = 'Error fetching lawyers. Please try again.';
                    errorMessage.style.display = 'block';
                }
            }
            
            // Function to display lawyer data in table
            function displayLawyers(lawyers) {
                // Clear existing table content
                lawyersTableBody.innerHTML = '';
                
                // Add each lawyer to the table
                lawyers.forEach(lawyer => {
                    const row = document.createElement('tr');
                    
                    // Create and append table cells
                    const nameCell = document.createElement('td');
                    nameCell.textContent = lawyer.Name;
                    row.appendChild(nameCell);
                    
                    const specializationCell = document.createElement('td');
                    specializationCell.textContent = lawyer.Specialization;
                    row.appendChild(specializationCell);
                    
                    const experienceCell = document.createElement('td');
                    experienceCell.textContent = lawyer.Experience;
                    row.appendChild(experienceCell);
                    
                    const contactCell = document.createElement('td');
                    contactCell.textContent = lawyer.Contact;
                    row.appendChild(contactCell);
                    
                    const addressCell = document.createElement('td');
                    addressCell.textContent = lawyer.Address;
                    row.appendChild(addressCell);
                    
                    // Add row to table
                    lawyersTableBody.appendChild(row);
                });
            }
            
            // Event listener for search button
            searchButton.addEventListener('click', function() {
                const pincode = pincodeInput.value.trim();
                
                // Validate pincode (simple validation for Mumbai pincodes)
                if (pincode.length !== 6 || isNaN(pincode) || !pincode.startsWith('4')) {
                    alert('Please enter a valid Mumbai pincode (6 digits, starts with 4)');
                    return;
                }
                
                fetchLawyers(pincode);
            });
            
            // Allow form submission on Enter key
            pincodeInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchButton.click();
                }
            });
        });
    </script>