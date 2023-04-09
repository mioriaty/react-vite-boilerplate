## Description

Spinners provide a visual cue that an action is processing, awaiting a course of change or a result.

## Import component

```jsx
import { Spinner } from '@app/components/Spinner';
```

## Usage

```jsx
<Spinner />
```

## Spinner with different sizes

```jsx
<>
  <Spinner size="extra-small" />
  <Spinner size="small" />
  <Spinner size="medium" />
  <Spinner size="large" />
</>
```

## Spinner with color

Change the background color of the moving section of the spinner by passing the `color` prop.

```jsx
<Spinner color="secondary" />
```

## Spinner with different speed

Change the spinner's animation speed area by passing the `speed` prop.

```jsx
<Spinner speed={0.5} />
```
