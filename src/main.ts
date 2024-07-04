import { script as io } from './io';

figma.showUI(__html__, { width: 300, height: 400, themeColors: true });

io.on('add-icon', data => {
  const icon = figma.createNodeFromSvg(data.icon);
  icon.name = data.name;
  icon.x = figma.viewport.center.x;
  icon.y = figma.viewport.center.y;
  figma.currentPage.selection = [icon];
});
