import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE } from '@app/core/tokens';

describe('authInterceptor - HTTP Testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LOCAL_STORAGE, useValue: { getItem: () => 'test_token' } }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should make GET requests through HttpClient', () => {
    httpClient.get('http://api.test/data').subscribe();

    const req = httpTestingController.expectOne('http://api.test/data');
    expect(req.request.method).toBe('GET');
    req.flush({ result: 'success' });
  });

  it('should make POST requests through HttpClient', () => {
    httpClient.post('http://api.test/data', { name: 'test' }).subscribe();

    const req = httpTestingController.expectOne('http://api.test/data');
    expect(req.request.method).toBe('POST');
    req.flush({ result: 'created' });
  });

  it('should make PATCH requests through HttpClient', () => {
    httpClient.patch('http://api.test/data/1', { name: 'updated' }).subscribe();

    const req = httpTestingController.expectOne('http://api.test/data/1');
    expect(req.request.method).toBe('PATCH');
    req.flush({ result: 'updated' });
  });

  it('should make DELETE requests through HttpClient', () => {
    httpClient.delete('http://api.test/data/1').subscribe();

    const req = httpTestingController.expectOne('http://api.test/data/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ result: 'deleted' });
  });

  it('should handle request errors', () => {
    let errorOccurred = false;

    httpClient.get('http://api.test/data').subscribe({
      error: () => { errorOccurred = true; }
    });

    const req = httpTestingController.expectOne('http://api.test/data');
    req.error(new ErrorEvent('Network error'));

    expect(errorOccurred).toBe(true);
  });
});
