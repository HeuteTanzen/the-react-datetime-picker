# The only React Datetime Picker you need

I tried a lot of datepickers and all had some drawbacks that really annoyed me or made it hard for the users to pick a date on either desktop or mobile. So I went out to create a datepicker using a UX pattern, that is not really usual, but that allows for nice selection of time and which I quite like, I first saw in a Angular datepicker (which is that one here: https://dalelotts.github.io/angular-bootstrap-datetimepicker/).

## Features

In this datepicker you first choose a year, than a month, than a hour and then a minute. So you go from less to more granular specification of your date object. But you can also choose to use the typical calendar (`Day`) view and go back and forth through the months.

Further features are:

- Easy selection of date and time (it is a datetime picker ;-))
- Choosing a min and max Date that is marked as selectable
- You can theme it to adapt to your design
- Using react as peer-dependency (you probably already have it anyhow in your bundle)
- and some selected date-fns methods and no other dependencies (only selected methods are used to minimize bundle size)


## Installation

Using npm:

```
npm install --save the-react-datetime-picker
```

and using yarn:

```
yarn add the-react-datetime-picker
```

## Usage

The minimalist usage example would be something like this:

```js
import DatetimePicker from 'the-react-datetime-picker'

<DatetimePicker onChange={ (newDate) => console.log(newDate) } />
```

Using the picker will call onChange whenever the user picked a date or changes a date and the given callback will be called with an instance of `Date`.

Further examples can be views in the `example.js` and all available options can be views in the following section:

## API (Props)

These are the properties you can use to configure the Datetime Picker:

| name     | type    | description     | default      | optional? |
|----------|---------|-----------------|--------------|-----------|
| theme | Object | An optional object specifying styling choices, to make it your own || yes |
| inputProps | Object | Properties to pass to the rendered input field || yes |
| selectedDate | Date | The date and time that is preselected in the datetime picker. | new Date() | yes |
| onChange | Function(Date) | Callback that is called, whenever the value changes || yes |
| placeholder | String | Text to show within the input field, whenever there is not yet a date picked || yes |
| resultFormat | String | Format of Date to show within the input field, whenever there is a date picked. Because there is no dependency used, you can only use these symbols to create a date output, right now: `Y`, `M`, `D`, `H`, `m`  | 'YYYY-MM-DD HH:mm' | yes |
| initialView | String | Defines which view will be shown initially. Possible values are: `Years`, `Months`, `Days`, `Hours`, `Minutes` | 'Years' | yes |
| min | Date | If defined, all dates and times before this one, are marked as outOfRange. || yes |
| max | Date | If defined, all dates and times after this one, are marked as outOfRange. || yes |

## Issues

If you find any issues, please add them into our tracker: https://github.com/HeuteTanzen/the-react-datetime-picker/issues.

## Development

We also except Pull Requests. So feel free to code. But to enhance the chances for your PR to be merged, please give a heads up, before you start hacking so we know what's coming. Also feel free to look into the issues on GitHub to see what's planned (labeled with backlog).

We use Babel through Webpack and yarn for installind and locking the dependencies.

## Licence

It's MIT licences. So feel free to use.
