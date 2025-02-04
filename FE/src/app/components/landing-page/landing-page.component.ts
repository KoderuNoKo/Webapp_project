import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { User } from '../../auth.service';
import { Router } from '@angular/router';

interface Stock {
  symbol: string;
  change: number;
  industry: string;
  exchange: string;
  price?: number;
  volume?: string;
  marketCap?: string;
  peRatio?: string;
}

interface StockData {
  symbol: string;
  industry: string;
  exchange: string;
  [key: string]: string; // Đảm bảo tất cả các giá trị là chuỗi
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  user: User | null = null;
  private authService: AuthService; // Thêm dòng này
  username: string = ''; // Khai báo thuộc tính username
  isDojiActive = false;
  isHammerActive = false;
  isBullishActive = false;
  isBabyActive = false;
  startDate: string = ''; // Thêm thuộc tính cho ngày bắt đầu
  endDate: string = '';   // Thêm thuộc tính cho ngày kết thúc
  sma: boolean = false; // Thêm thuộc tính sma
  ema: boolean = false;
  rsi: boolean = false;
  bbands: boolean = false;
  candle: boolean = false;

  
  constructor(authService: AuthService, private router: Router) { // Thêm constructor
    this.authService = authService;
    const user = this.authService.getUser();
    if (user) {
      this.username = user.username; // Lấy tên người dùng từ AuthService
      console.log(`Username: ${this.username}`);
    }
  }

  watchlist = [
    { symbol: 'AAPL', change: 2.5, industry: 'Consumer Electronics', exchange: 'NASDAQ' },
    { symbol: 'GOOGL', change: -1.2, industry: 'Internet Content & Information', exchange: 'NASDAQ' },
    { symbol: 'MSFT', change: 1.8, industry: 'Software - Infrastructure', exchange: 'NASDAQ' },
    { symbol: 'AMZN', change: -0.5, industry: 'Internet Retail', exchange: 'NASDAQ' },
    { symbol: 'TSLA', change: 3.2, industry: 'Auto Manufacturers', exchange: 'NASDAQ' }
  ];

  selectedStock: Stock = this.watchlist[0];

  stockData = {
    symbol: 'AAPL',
    industry: 'Consumer Electronics',
    exchange: 'NASDAQ'
  };

  technicalIndicators = {
    momentum: [
      { name: 'RSI (14)', value: '65.2' },
      { name: 'MACD', value: '1.5' }
    ],
    trend: [
      { name: 'SMA (50)', value: '$148.50' },
      { name: 'EMA (20)', value: '$149.75' }
    ],
    volatility: [
      { name: 'Bollinger Bands', value: 'Upper: $155.20 / Lower: $145.30' }
    ]
  };

  activeTab = 'momentum';
  selectedTimeframe = '1d';

  ngOnInit() {
    this.user = this.authService.getUser();
    // Initialization logic can be added here
  }

  selectStock(stock: Stock) {
    this.selectedStock = stock;
    this.stockData = {
      symbol: stock.symbol,
      industry: stock.industry,
      exchange: stock.exchange
    };
    // Here you would typically fetch more detailed data for the selected stock
    console.log(`Selected stock: ${stock.symbol}`);
  }

  addStock() {
    alert('Add stock functionality would be implemented here');
  }

  goToTest() {
    this.router.navigate(['/test']);
  }

  updateChart() {
    if (this.startDate && this.endDate) {
      // Logic để cập nhật biểu đồ dựa trên startDate và endDate
      console.log(`Updating chart from ${this.startDate} to ${this.endDate}`);
      // Thêm logic xử lý dữ liệu và cập nhật biểu đồ ở đây
    } else {
      console.warn('Please select both start and end dates.');
    }
  }

  toggleIndicator(indicator: string) {
    if (indicator === 'SMA') {
      this.sma = !this.sma; // Chuyển đổi giá trị của sma
    }
    alert(`Toggle ${indicator} functionality would be implemented here`);
  }

  showTab(tabName: string) {
    this.activeTab = tabName;
  }

  searchStocks(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    console.log('Searching for:', searchTerm);
    // Implement search functionality here
  }

  toLandingPage() {
    this.router.navigate(['/homepage'])
  }

  toTest() {
    //this.router.navigate(['/strategy'])
    this.router.navigate(['/test'])
  }

  toBackTest(){
    this.router.navigate(['/backtest'])
  }

  toggleBaby(){
    this.isBabyActive = !this.isBabyActive;
  }

  toggleBullish(){this.isBullishActive = !this.isBullishActive;}

  toggleDoji(){this.isDojiActive = !this.isDojiActive;}

  toggleHammer(){this.isHammerActive = !this.isHammerActive;}

  activeButton = '';

  setActiveButton(button: string): void {
    this.activeButton = button;
  }

  logout() {
    // Logic để đăng xuất người dùng
    this.authService.setUser({ username: '', password: '' });
    // Điều hướng hoặc thực hiện các hành động khác sau khi đăng xuất
    this.router.navigate(['/']);
  }
}
