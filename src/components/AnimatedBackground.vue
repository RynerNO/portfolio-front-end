<template>

      <div id="pt" class="animated-background" ref="ptsCont">
          
      </div>

</template>

<script>
import {CanvasSpace, Pt, Group, Line, Const} from 'pts';
export default {
data() {
  return {
    animateBg: true,
  }
},
beforeDestroy() {
  this.animateBg = false;
},
mounted() {
   let space = new CanvasSpace('#pt');
   this.floatySpace(space);
  setTimeout(() => {
    if(window.innerWidth == space.size[0] && window.innerHeight == space.size[1]) return;
    space.removeAll()
    space.clear()
    space.dispose()
    space.element.remove()

    space = new CanvasSpace('#pt');
    this.floatySpace(space);
  }, 2000)
  



},
methods: {

 floatySpace(space) {
  let colors = [
    "#2196F3", "#FF5D56", "#FF00FF", "#9ACD32", 
  ];
  let form = space.getForm()
  space.setup({ bgcolor: "#111217" });
      let pts = new Group();
      let angle, count ,line, mouse, r 
      let i = 0;

  
     
   
  
  space.add({
    start: () => {
      space.autoResize = true;
    },
    animate: (time, fps, context) => {
      if(!this.animateBg){ 
        
        space.removeAll()
        space.clear()
        space.element.remove()
        space.dispose()
        space = null;
        return 
      }
      i++;
      if(i >= 25) {
          if(-(window.innerWidth * 0.5) != angle) {
            pts = new Group()
            angle = -(window.innerWidth * 0.5);
    
            count = 55;
            line = [new Pt(0, angle), new Pt(space.size.x, 0)]
            mouse = space.pointer
            r =  Math.min(space.size.x, space.size.y);
            for (let i=0; i<count; i++) {
                let p = new Pt( Math.random()*r-Math.random()*r, Math.random()*r-Math.random()*r );
                p.brightness = 0.1
                pts.push( p );

            }
            pts.moveBy(space.center)
          }
            i=0
      }
      pts.rotate2D( Const.one_degree / 20, space.center);
      
      pts.forEach( (pt, i) => { 
        let ln = [pt, Line.perpendicularFromPt(line, pt)] 

        // opacity of line derived from distance to the line
        let opacity = Math.min( 0.8, 1 - Math.abs( Line.distanceFromPt(line, pt)) / r);
        let distFromMouse = Math.abs(Line.distanceFromPt(ln, mouse))

        if (distFromMouse < 50) {
          if (pts[i].brightness < 0.3) pts[i].brightness += 0.015
        } else {
          if (pts[i].brightness > 0.1) pts[i].brightness -= 0.01
        }
        form.stroke( false ).fill( colors[i % 3] ).point(pt, 1)
        let color = "rgba(255,255,255," + pts[i].brightness +")"
        form.strokeOnly(color).fill(true).line(ln);
      })
     
      
    },

    action: function(type, x, y, evt) {
      if (type=="move") {
        if(mouse !== undefined) {
          mouse = new Pt(x, y)
        }
        
      }
    }
  });

  space.bindMouse().play();
}

}
}
</script>

<style lang="sass" scoped>

.animated-background
  width: 100vw
  height: 100vh
  z-index: 10
  @apply absolute
  @apply left-0
  @apply top-0
  & ::v-deep .pt_canvas 
    z-index: 11
    


</style>