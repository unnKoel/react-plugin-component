Validating a type of plugin pattern in developing React components. 

During my daily work, I found that the size of a generic component gets bigger and bigger when adding more features into it. So a solution that I desire is that a feature can be added into a component as a plugin to be combined, rather than coupled into a component.

After a lot of efforts made, finally I found an open source repository called [devextreme-reactive](https://github.com/DevExpress/devextreme-reactive) that introduces a plugin pattern of developing components. Thus I started to learn its source code in order to obtain the key idea, that inspires me to develop this pattern.

The mean of this repository is to check if the plugin pattern is able to be used in developing low-code tool as a solution.   

The file that demonstrates using this plugin pattern is [table.js](https://github.com/unnKoel/react-plugin-component/blob/master/src/components/table.js)
If you check out that, you would find that `tableHeader` component is used in the same level with `tableCell` component, that breaks nested composition of components. So we are able to separate the implementation and declaration of a component, that's the key to compose parts of a component in a declarative way.
