## Import component

```jsx
import Switch from '@app/components/Switch';
```

## Usage

```jsx
<Switch />
```

## Props

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Type</th>
    <th>Default value</th>
  </tr>

  <tr>
    <td>checked</td>
    <td>status active của component</td>
    <td>boolean | undefined</td>
    <td>-</td>
  </tr>

   <tr>
    <td>defaultChecked</td>
    <td>default status active của component</td>
    <td>boolean | undefined</td>
    <td>false</td>
  </tr>

  <tr>
    <td>CheckedChildren</td>
    <td>children của component khi active</td>
    <td>ReactNode | undefined</td>
    <td>-</td>
  </tr>

  <tr>
    <td>UnCheckedChildren</td>
    <td>children của component khi unactive</td>
    <td>ReactNode | undefined</td>
    <td>-</td>
  </tr>

  <tr>
    <td>disabled</td>
    <td>Khi bật disabled thì nút mờ đi và không thể thực hiện event</td>
    <td>boolean | undefined</td>
    <td>false</td>
  </tr>

  <tr>
    <td>loading</td>
    <td>Khi bật loading thì nút sẽ ở trạng thái loading và không thể thực hiện event </td>
    <td>boolean | undefined</td>
    <td>false</td>
  </tr>

  <tr>
    <td>size</td>
    <td>Kích thước component</td>
    <td>Size('extra-small' | 'small' | 'medium' | 'large')</td>
    <td>medium</td>
  </tr>

</table>
