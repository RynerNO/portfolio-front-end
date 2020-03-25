<template>

      <div id="pt">
          
      </div>

</template>

<script>
import {CanvasSpace, Pt, Group, Line, Const} from 'pts';

export default {
mounted() {




this.$nextTick(function() {
this.floatySpace(new CanvasSpace('#pt'));
})

},
methods: {

 floatySpace(space) {

  let colors = [
    "#FF3F8E", "#04C2C9", "#2E55C1"
  ];
  let form = space.getForm()
  space.setup({ bgcolor: "#252934" });
      let pts = new Group();
      let angle, count ,line, mouse, r 
      let i = 0;

  
     
   
   
  space.add({
    start:  function(bound, space) {
        space.autoResize = true
       
    },
    animate: function(time, fps, context) {

      i++;
      if(i >= 15) {
          if(-(window.innerWidth * 0.5) != angle) {
            pts = new Group()
            angle = -(window.innerWidth * 0.5);
            count = window.innerWidth * 0.05;
            if (count > 150) count = 150;
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