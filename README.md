# ionic2-multiloading

## Purpose
The MultiLoadingService allows you to use the Ionic2 Loading component in a way
that keeps the loading popup open until all requests are done loading.  This prevents
a flickering effect, where the loading popup quickly opens and closes for each request.

## Instructions

1. In your app.module.ts, import the MultiLoadingService and then add it as a provider.

```
import { MultiLoadingService } from 'ionic2-multiloading';

@NgModule()
...

providers: [
    MultiLoadingService
]

```

2. Then inject MultiLoadingService into a component.

```
import { MultiLoadingService } from 'ionic2-multiloading';

@Component({
    ...
})
export class MyComponent {
    constructor(private multiLoadingService: MultiLoadingService)
}

```

3. Then before you do a request, run:
```
loadData() {
    this.multiLoadingService.startLoading('some-data-request-id', 'Loading...');
    http.get('./someData.json').toPromise().then((resp) => {
        this.multiLoadingService.stopLoading('some-data-request-id');
    }).catch((err) => {
        this.multiLoadingService.stopAllLoading();
    });

    this.multiLoadingService.startLoading('some-other-data-request-id', 'Loading...');
    http.get('./someOtherData.json').toPromise().then((resp) => {
        this.multiLoadingService.stopLoading('some-other-data-request-id');
    }).catch((err) => {
        this.multiLoadingService.stopAllLoading();
    });
}
```

