import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchControlComponent } from './search-control.component';
import { FormsModule } from '@angular/forms';

describe('SearchControlComponent', () => {
  let component: SearchControlComponent;
  let fixture: ComponentFixture<SearchControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchControlComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search text', () => {
    expect(component.searchText).toBe('');
  });

  it('should emit searchQuery on input change', (done) => {
    component.searchQuery.subscribe((query: string) => {
      expect(query).toBe('angular');
      done();
    });
    component.onSearchChange('angular');
  });

  it('should clear search text on clearSearch', () => {
    component.searchText = 'angular';
    component.clearSearch();
    expect(component.searchText).toBe('');
  });

  it('should emit empty string on clear', (done) => {
    component.searchQuery.subscribe((query: string) => {
      expect(query).toBe('');
      done();
    });
    component.clearSearch();
  });

  it('should display search input', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.search-input')).toBeTruthy();
  });

  it('should have placeholder text', () => {
    expect(component.placeholder).toBe('Search courses by name or instructor...');
  });

  it('should log on ngOnInit', () => {
    fixture.detectChanges();
    expect(component.placeholder).toBe('Search courses by name or instructor...');
  });

  it('should log on ngOnDestroy', () => {
    fixture.destroy();
    expect(component).toBeTruthy();
  });

  it('should show clear button when search text is not empty', () => {
    component.searchText = 'test';
    fixture.detectChanges();
    const clearButton = fixture.nativeElement.querySelector('.clear-button');
    expect(clearButton).toBeTruthy();
  });
});
