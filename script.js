/**
 * Auto Kredit Kalkulator - JavaScript Logic
 * Kalkulator za izračunavanje auto kredita na srpskom jeziku
 * @version 1.0
 * @author Your Name
 */

// DOM Element References
class CalculatorElements {
    constructor() {
        // Input elements
        this.vehiclePrice = document.getElementById('vehiclePrice');
        this.downPayment = document.getElementById('downPayment');
        this.downPaymentPercent = document.getElementById('downPaymentPercent');
        this.downPaymentPercentValue = document.getElementById('downPaymentPercentValue');
        this.loanTerm = document.getElementById('loanTerm');
        this.loanTermRange = document.getElementById('loanTermRange');
        this.loanTermValue = document.getElementById('loanTermValue');
        this.interestRate = document.getElementById('interestRate');
        this.additionalCosts = document.getElementById('additionalCosts');
        this.insuranceType = document.getElementById('insuranceType');
        
        // Button elements
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Result elements
        this.resultsCard = document.getElementById('resultsCard');
        this.resultsMain = document.getElementById('resultsMain');
        this.resultsPlaceholder = document.querySelector('.results-placeholder');
        this.monthlyPayment = document.getElementById('monthlyPayment');
        this.totalInterest = document.getElementById('totalInterest');
        this.totalAmount = document.getElementById('totalAmount');
        this.principalAmount = document.getElementById('principalAmount');
        this.interestAmount = document.getElementById('interestAmount');
        this.loanAmount = document.getElementById('loanAmount');
        this.downPaymentResult = document.getElementById('downPaymentResult');
        this.additionalCostsResult = document.getElementById('additionalCostsResult');
        this.insuranceCost = document.getElementById('insuranceCost');
        this.totalInvestment = document.getElementById('totalInvestment');
        this.principalProgress = document.getElementById('principalProgress');
        this.interestProgress = document.getElementById('interestProgress');
        
        // Amortization table elements
        this.amortizationSection = document.getElementById('amortizationSection');
        this.amortizationBody = document.getElementById('amortizationBody');
    }
}

// Main Calculator Class
class AutoLoanCalculator {
    constructor() {
        this.elements = new CalculatorElements();
        this.init();
    }
    
    /**
     * Initialize calculator event listeners
     */
    init() {
        // Add event listeners for calculate and reset buttons
        this.elements.calculateBtn.addEventListener('click', () => this.calculate());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        
        // Add real-time synchronization for range inputs
        this.setupRangeSync();
        
        // Add input validation
        this.setupInputValidation();
        
        console.log('Auto Kredit Kalkulator je inicijalizovan');
    }
    
    /**
     * Set up synchronization between number inputs and range sliders
     */
    setupRangeSync() {
        // Učešće synchronization
        this.elements.downPayment.addEventListener('input', () => this.syncDownPayment());
        this.elements.downPaymentPercent.addEventListener('input', () => this.syncDownPaymentPercent());
        
        // Rok otplate synchronization
        this.elements.loanTerm.addEventListener('input', () => this.syncLoanTerm());
        this.elements.loanTermRange.addEventListener('input', () => this.syncLoanTermRange());
    }
    
    /**
     * Sync down payment amount when percentage changes
     */
    syncDownPaymentPercent() {
        const percent = parseInt(this.elements.downPaymentPercent.value);
        const vehiclePrice = parseFloat(this.elements.vehiclePrice.value) || 0;
        
        if (vehiclePrice > 0) {
            const downPaymentAmount = (vehiclePrice * percent) / 100;
            this.elements.downPayment.value = Math.round(downPaymentAmount);
            this.elements.downPaymentPercentValue.textContent = `${percent}%`;
        }
    }
    
    /**
     * Sync down payment percentage when amount changes
     */
    syncDownPayment() {
        const downPaymentAmount = parseFloat(this.elements.downPayment.value) || 0;
        const vehiclePrice = parseFloat(this.elements.vehiclePrice.value) || 1;
        
        if (vehiclePrice > 0) {
            const percent = Math.round((downPaymentAmount / vehiclePrice) * 100);
            this.elements.downPaymentPercent.value = Math.min(percent, 100);
            this.elements.downPaymentPercentValue.textContent = `${Math.min(percent, 100)}%`;
        }
    }
    
    /**
     * Sync loan term when range slider changes
     */
    syncLoanTermRange() {
        const months = parseInt(this.elements.loanTermRange.value);
        this.elements.loanTerm.value = months;
        this.updateLoanTermDisplay(months);
    }
    
    /**
     * Sync loan term range when input changes
     */
    syncLoanTerm() {
        const months = parseInt(this.elements.loanTerm.value) || 12;
        const clampedMonths = Math.max(12, Math.min(84, months));
        this.elements.loanTerm.value = clampedMonths;
        this.elements.loanTermRange.value = clampedMonths;
        this.updateLoanTermDisplay(clampedMonths);
    }
    
    /**
     * Update loan term display with years and months
     */
    updateLoanTermDisplay(months) {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        let displayText = '';
        if (years > 0) {
            displayText += `${years} ${this.getYearText(years)}`;
        }
        if (remainingMonths > 0) {
            if (years > 0) displayText += ' i ';
            displayText += `${remainingMonths} ${this.getMonthText(remainingMonths)}`;
        }
        
        this.elements.loanTermValue.textContent = displayText || '12 meseci';
    }
    
    /**
     * Get correct Serbian word for years
     */
    getYearText(years) {
        if (years === 1) return 'godina';
        if (years >= 2 && years <= 4) return 'godine';
        return 'godina';
    }
    
    /**
     * Get correct Serbian word for months
     */
    getMonthText(months) {
        if (months === 1) return 'mesec';
        if (months >= 2 && months <= 4) return 'meseca';
        return 'meseci';
    }
    
    /**
     * Set up input validation
     */
    setupInputValidation() {
        const inputs = [
            this.elements.vehiclePrice,
            this.elements.downPayment,
            this.elements.loanTerm,
            this.elements.interestRate,
            this.elements.additionalCosts
        ];
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('input', () => this.clearValidation(input));
        });
    }
    
    /**
     * Validate individual input
     */
    validateInput(input) {
        const value = parseFloat(input.value);
        let isValid = true;
        let message = '';
        
        switch(input.id) {
            case 'vehiclePrice':
                isValid = value >= 100000;
                message = 'Cena vozila mora biti najmanje 100.000 RSD';
                break;
            case 'downPayment':
                const vehiclePrice = parseFloat(this.elements.vehiclePrice.value) || 0;
                isValid = value >= 0 && value <= vehiclePrice;
                message = 'Učešće mora biti između 0 i cene vozila';
                break;
            case 'loanTerm':
                isValid = value >= 12 && value <= 84;
                message = 'Rok otplate mora biti između 12 i 84 meseca';
                break;
            case 'interestRate':
                isValid = value >= 2 && value <= 20;
                message = 'Kamatna stopa mora biti između 2% i 20%';
                break;
            case 'additionalCosts':
                isValid = value >= 0;
                message = 'Dodatni troškovi ne mogu biti negativni';
                break;
        }
        
        if (!isValid && input.value !== '') {
            this.showValidationError(input, message);
        } else {
            this.clearValidation(input);
        }
        
        return isValid;
    }
    
    /**
     * Show validation error
     */
    showValidationError(input, message) {
        this.clearValidation(input);
        input.style.borderColor = '#e74c3c';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
    }
    
    /**
     * Clear validation styling and messages
     */
    clearValidation(input) {
        input.style.borderColor = '';
        const errorDiv = input.parentNode.querySelector('.validation-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    /**
     * Validate all inputs before calculation
     */
    validateAllInputs() {
        const inputs = [
            this.elements.vehiclePrice,
            this.elements.downPayment,
            this.elements.loanTerm,
            this.elements.interestRate
        ];
        
        let allValid = true;
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                allValid = false;
                input.focus();
            }
        });
        
        return allValid;
    }
    
    /**
     * Main calculation function
     */
    calculate() {
        // Validate inputs first
        if (!this.validateAllInputs()) {
            this.showNotification('Molimo popravite greške u formi pre izračunavanja', 'error');
            return;
        }
        
        try {
            // Get input values
            const vehiclePrice = parseFloat(this.elements.vehiclePrice.value);
            const downPayment = parseFloat(this.elements.downPayment.value) || 0;
            const loanTermMonths = parseInt(this.elements.loanTerm.value);
            const annualInterestRate = parseFloat(this.elements.interestRate.value) / 100;
            const additionalCosts = parseFloat(this.elements.additionalCosts.value) || 0;
            const insuranceType = this.elements.insuranceType.value;
            
            // Calculate loan amount
            const loanAmount = vehiclePrice - downPayment;
            
            if (loanAmount <= 0) {
                this.showNotification('Učešće ne može biti veće od cene vozila', 'error');
                return;
            }
            
            // Calculate monthly interest rate
            const monthlyInterestRate = annualInterestRate / 12;
            
            // Calculate monthly payment using annuity formula
            const monthlyPayment = this.calculateMonthlyPayment(loanAmount, monthlyInterestRate, loanTermMonths);
            
            // Calculate total amounts
            const totalPayment = monthlyPayment * loanTermMonths;
            const totalInterest = totalPayment - loanAmount;
            
            // Calculate insurance cost
            const insuranceRate = this.getInsuranceRate(insuranceType);
            const annualInsuranceCost = vehiclePrice * insuranceRate;
            const monthlyInsuranceCost = annualInsuranceCost / 12;
            
            // Calculate total monthly cost (loan payment + insurance)
            const totalMonthlyCost = monthlyPayment + monthlyInsuranceCost;
            
            // Calculate total investment
            const totalInvestment = downPayment + totalPayment + additionalCosts + (annualInsuranceCost * (loanTermMonths / 12));
            
            // Display results
            this.displayResults({
                monthlyPayment,
                totalInterest,
                totalPayment,
                loanAmount,
                downPayment,
                additionalCosts,
                annualInsuranceCost,
                totalInvestment,
                totalMonthlyCost,
                principal: loanAmount,
                interest: totalInterest
            });
            
            // Generate amortization table
            this.generateAmortizationTable(loanAmount, monthlyInterestRate, loanTermMonths, monthlyPayment);
            
            // Show success notification
            this.showNotification('Kalkulacija je uspešno završena!', 'success');
            
        } catch (error) {
            console.error('Greška pri izračunavanju:', error);
            this.showNotification('Došlo je do greške pri izračunavanju. Proverite unete podatke.', 'error');
        }
    }
    
    /**
     * Calculate monthly payment using annuity formula
     */
    calculateMonthlyPayment(principal, monthlyRate, months) {
        if (monthlyRate === 0) {
            return principal / months;
        }
        
        const rateFactor = Math.pow(1 + monthlyRate, months);
        return principal * ((monthlyRate * rateFactor) / (rateFactor - 1));
    }
    
    /**
     * Get insurance rate based on selected type
     */
    getInsuranceRate(insuranceType) {
        const rates = {
            'kasko': 0.015,    // 1.5%
            'obavezno': 0.005, // 0.5%
            'none': 0          // 0%
        };
        
        return rates[insuranceType] || 0;
    }
    
    /**
     * Display calculation results
     */
    displayResults(results) {
        // Format currency function
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('sr-RS', {
                style: 'currency',
                currency: 'RSD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        };
        
        // Update main results
        this.elements.monthlyPayment.textContent = formatCurrency(results.monthlyPayment);
        this.elements.totalInterest.textContent = formatCurrency(results.totalInterest);
        this.elements.totalAmount.textContent = formatCurrency(results.totalPayment);
        this.elements.principalAmount.textContent = formatCurrency(results.principal);
        this.elements.interestAmount.textContent = formatCurrency(results.interest);
        this.elements.loanAmount.textContent = formatCurrency(results.loanAmount);
        this.elements.downPaymentResult.textContent = formatCurrency(results.downPayment);
        this.elements.additionalCostsResult.textContent = formatCurrency(results.additionalCosts);
        this.elements.insuranceCost.textContent = formatCurrency(results.annualInsuranceCost);
        this.elements.totalInvestment.textContent = formatCurrency(results.totalInvestment);
        
        // Update progress bars
        const total = results.principal + results.interest;
        const principalPercent = (results.principal / total) * 100;
        const interestPercent = (results.interest / total) * 100;
        
        this.elements.principalProgress.style.width = `${principalPercent}%`;
        this.elements.interestProgress.style.width = `${interestPercent}%`;
        
        // Show results section
        this.elements.resultsPlaceholder.style.display = 'none';
        this.elements.resultsMain.style.display = 'block';
        this.elements.amortizationSection.style.display = 'block';
        
        // Add animation
        this.elements.resultsMain.classList.add('fade-in');
    }
    
    /**
     * Generate amortization table
     */
    generateAmortizationTable(principal, monthlyRate, months, monthlyPayment) {
        this.elements.amortizationBody.innerHTML = '';
        
        let remainingBalance = principal;
        const displayMonths = Math.min(12, months);
        
        for (let month = 1; month <= displayMonths; month++) {
            const interestPayment = remainingBalance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance -= principalPayment;
            
            // Avoid negative balance due to rounding
            if (remainingBalance < 0) remainingBalance = 0;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${month}</td>
                <td>${this.formatNumber(monthlyPayment)}</td>
                <td>${this.formatNumber(interestPayment)}</td>
                <td>${this.formatNumber(principalPayment)}</td>
                <td>${this.formatNumber(remainingBalance)}</td>
            `;
            
            this.elements.amortizationBody.appendChild(row);
        }
    }
    
    /**
     * Format number as Serbian currency
     */
    formatNumber(amount) {
        return new Intl.NumberFormat('sr-RS', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.round(amount));
    }
    
    /**
     * Show notification message
     */
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '6px';
        notification.style.color = 'white';
        notification.style.fontWeight = '600';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        
        // Set background color based on type
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    /**
     * Reset calculator to initial state
     */
    reset() {
        // Reset input values to defaults
        this.elements.vehiclePrice.value = '300000';
        this.elements.downPayment.value = '60000';
        this.elements.downPaymentPercent.value = '20';
        this.elements.downPaymentPercentValue.textContent = '20%';
        this.elements.loanTerm.value = '60';
        this.elements.loanTermRange.value = '60';
        this.updateLoanTermDisplay(60);
        this.elements.interestRate.value = '6.5';
        this.elements.additionalCosts.value = '25000';
        this.elements.insuranceType.value = 'obavezno';
        
        // Clear validation errors
        const inputs = document.querySelectorAll('.form-input, .form-select');
        inputs.forEach(input => this.clearValidation(input));
        
        // Hide results
        this.elements.resultsMain.style.display = 'none';
        this.elements.amortizationSection.style.display = 'none';
        this.elements.resultsPlaceholder.style.display = 'flex';
        
        // Show notification
        this.showNotification('Kalkulator je resetovan na početne vrednosti', 'info');
        
        console.log('Kalkulator resetovan');
    }
}

// Insurance rate descriptions for tooltips
const insuranceRates = {
    'kasko': 'Kasko osiguranje pokrija štetu na vlastitom vozilu (prosečno 1-2% godišnje)',
    'obavezno': 'Obavezno osiguranje pokriva štetu nanetu trećim licima (oko 0.5% godišnje)',
    'none': 'Bez osiguranja - samo za informativne svrhe'
};

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new AutoLoanCalculator();
    
    // Add global error handling
    window.addEventListener('error', (event) => {
        console.error('Globalna greška:', event.error);
    });
    
    console.log('Auto Kredit Kalkulator je spreman za korišćenje!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoLoanCalculator;
}
