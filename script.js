/**
 * Avto Kredit Kalkulator - JavaScript Logika
 * Kalkulator za izračun avto kreditov v slovenskem jeziku
 * @version 1.0
 * @author Vaše Ime
 */

// DOM Element References - Reference DOM elementov
class CalculatorElements {
    constructor() {
        // Vhodni elementi
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
        
        // Gumbi
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Rezultati
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
        
        // Tabela odplačila
        this.amortizationSection = document.getElementById('amortizationSection');
        this.amortizationBody = document.getElementById('amortizationBody');
    }
}

// Glavni razred kalkulatorja
class AvtoLoanCalculator {
    constructor() {
        this.elements = new CalculatorElements();
        this.init();
    }
    
    /**
     * Inicializacija poslušalcev dogodkov kalkulatorja
     */
    init() {
        // Dodajanje poslušalcev za gumba izračunaj in ponastavi
        this.elements.calculateBtn.addEventListener('click', () => this.calculate());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        
        // Nastavitev sinhronizacije drsnikov
        this.setupRangeSync();
        
        // Nastavitev validacije vhodov
        this.setupInputValidation();
        
        console.log('Avto Kredit Kalkulator je inicializiran');
    }
    
    /**
     * Nastavitev sinhronizacije med številčnimi vhodi in drsniki
     */
    setupRangeSync() {
        // Sinhronizacija lastnega vložka
        this.elements.downPayment.addEventListener('input', () => this.syncDownPayment());
        this.elements.downPaymentPercent.addEventListener('input', () => this.syncDownPaymentPercent());
        
        // Sinhronizacija roka odplačila
        this.elements.loanTerm.addEventListener('input', () => this.syncLoanTerm());
        this.elements.loanTermRange.addEventListener('input', () => this.syncLoanTermRange());
    }
    
    // ... ostala koda z slovenskimi komentarji ...
}

// Inicializacija kalkulatorja ko je DOM naložen
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new AvtoLoanCalculator();
    
    // Globalno ravnanje z napakami
    window.addEventListener('error', (event) => {
        console.error('Globalna napaka:', event.error);
    });
    
    console.log('Avto Kredit Kalkulator je pripravljen za uporabo!');
});
