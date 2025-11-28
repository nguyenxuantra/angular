import {debounceTime, filter, fromEvent, interval, Observable, of, takeUntil, tap, map, BehaviorSubject} from "rxjs";
import {fromAjax} from "rxjs/internal/ajax/ajax";

// const obs$ = new Observable<string>(observer =>{  // Obserable nơi chưa dữ liệu
//   observer.next('Hello');    // observer người nghe dữ liệu
//   observer.next('World');
//   observer.complete();
// });
//
// obs$.subscribe({
//   next: v => console.log('value',v),
//   error: err => console.log('error',err),
//   complete: () => console.log('done')
// });

// of tạo dữ liêu tĩnh
//  of(1,2,3).subscribe(v => console.log(v));

// from([1,2,3]).subscribe(v => console.log(v)); tạo mảng dữ liệu tĩnh nhưng from đã bị khai trừ tìm cách khác

// tạo stream theo thời gian
// interval(1000).subscribe(v=>console.log(v));

// fromEvent(button, 'click').subscribe(v => console.log('click')); lăng nghe dom events

// transform dữ lệu với pipe()
// vidu map + filter ở đây map đã bị khai trừ tìm cách khác

// interval(500).pipe(
//   map(x=> x*2),
//   filter(x=> x % 4===0)
// )
//   .subscribe(console.log);

// =============== các operator quan trọng nhất ===============
// map() -  biến đổi dữ liệu
// filter() - lọc
// take() - lấy X phần tử rồi complete
// debounceTime() - chống spam ( hay dùng cho search)
// switchMap() - cực quan trọng khi gọi API search
// mergeMap() -chạy song song
// concatMap() - chạy tuần tự
// tap() - log ra, debug
// catchError() - bắt lỗi HTTP

// live search ( debounce + switchMap)
// this.searchControl.valueChanges
// .pipe(
//   debounceTime(300),
//   switchMap(keyword => this.api.search(keyword))
// )
// .subscribe(
//   result =>{
//     this.items = result;
//   },
// )

// huỷ observable để tránh memory leak
// private destroy$ = new Subject<void>();
//
// this.service.getData()
//   .pipe(takeUntil(this.destroy$))
//   .subscribe();
//
// ngOnDestroy() {
//   this.destroy$.next();
//   this.destroy$.complete();
// }

// hoặc dùng
// <div *ngIf="data$ | async as data"></div>

// of(1,2,3,4,5,6,7,8,9,10)
// .pipe(
//
//   filter(x=> x>5),
//   map(x=> x*2),
//
// )
//   .subscribe(console.log);

// BehaviorSubject lưu giá trị mới nhất
// ReplaySubject lưu nhiều giá trị

// const name$ = new BehaviorSubject("Initial");
// name$.subscribe(v=>console.log("A:",v));
// name$.next("Hello");
// name$.subscribe(v => console.log("B:",v))
