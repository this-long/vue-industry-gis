import Vue from "vue"
import 'element-ui/lib/theme-chalk/index.css' //难道不引入样式不可以了吗？

import { Button, Submenu, MenuItemGroup, MenuItem, Menu, Avatar, Dropdown, DropdownMenu, DropdownItem, Input, Alert, Switch, Autocomplete, RadioGroup, Radio, FormItem, Popover, Table, TableColumn, Form, Message, Select, Option, Col, DatePicker, TimePicker, CheckboxGroup, Checkbox, Rate, Upload, Divider } from "element-ui"

Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Avatar)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(Input)
Vue.use(Alert)
Vue.use(Switch)
Vue.use(Autocomplete)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(FormItem)
Vue.use(Popover)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(Select)
Vue.use(Option)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Rate)
Vue.use(Upload)
Vue.use(Divider)

Vue.prototype.$message = Message
