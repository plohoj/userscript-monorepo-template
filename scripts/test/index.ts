import { observeQuerySelectorAll, mergeMapAddedElements } from '@plohoj/html-editor';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

observeQuerySelectorAll('a').pipe(
    mergeMapAddedElements(
        element => fromEvent(element, 'click')
            .pipe(map(() => element)),
        {isTakeUntilRemoved: true},
    ),
)
.subscribe(element => console.log('Link was clicked', element));
