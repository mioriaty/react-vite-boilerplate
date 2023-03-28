## Description
This component is used when calling an API.

## Import component 
```jsx
import { AsyncComponent } from '@app/components/AsyncComponent'
```

## Usage
### Status of the API
```jsx
status: 'idle' | 'loading' | 'success' | 'failure'
```
```jsx
<AsyncComponent status={status} />
```

### Show html element when requesting. Passing `Request` prop.
```jsx
<AsyncComponent 
  Request={
    <div css={{ padding: '80px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner size="medium" />
    </div>
  } 
/>
```

### Show html element when request success. Passing `Success` prop.
```jsx
const data = [
  {
    id: 1,
    label: 'Data 1'
  },
  {
    id: 2,
    label: 'Data 2'
  }
];
<AsyncComponent 
  Success={data.map(item => (
    <div key={item.id}>
      {item.label}
    </div>
  ))} 
/>
```

### Show html element when request fail. Passing `Failure` prop.
```jsx
<AsyncComponent 
  Failure={
    <div css={{ maxWidth: '600px', margin: 'auto', padding: '80px 10px' }}>
      oops
    </div>
  } 
/>
```

### Show html element when request success but the data is empty. Passing `Empty` prop.
```jsx
<AsyncComponent 
  Empty={
    <div css={{ padding: '20px 0' }}>
      Empty
    </div>
  } 
/>
```