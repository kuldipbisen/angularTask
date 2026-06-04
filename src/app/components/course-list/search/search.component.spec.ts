import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event', (done) => {
    component.search.subscribe((value: string) => {
      expect(value).toBe('Angular');
      done();
    });
    component.searchValue = 'Angular';
    component.onSearch();
  });

  it('should emit addCourse event', (done) => {
    component.addCourse.subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });
    component.onCourseAdd();
  });
});
