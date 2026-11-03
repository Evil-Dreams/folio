import { useEffect, useRef } from 'react'

type Cube = { x: number; y: number; startX: number; startY: number; size: number; delay: number; yaw: number; phase: number }
type Node = { x: number; y: number; radius: number; phase: number; orbit: number; speed: number }

const seed = (value: number) => {
  const result = Math.sin(value * 127.1 + 311.7) * 43758.5453
  return result - Math.floor(result)
}

function drawCube(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, time: number, alpha: number, yaw: number, core = false) {
  const extent = size / 2
  const pitch = -.52 + Math.sin(time * .00022 + yaw) * .045
  const turn = yaw + time * .00012
  const verts: [number, number, number][] = []
  for (let i = 0; i < 8; i++) {
    const x = (i & 1) ? extent : -extent
    const y = (i & 2) ? extent : -extent
    const z = (i & 4) ? extent : -extent
    const rx = x * Math.cos(turn) - z * Math.sin(turn)
    const rz = x * Math.sin(turn) + z * Math.cos(turn)
    const ry = y * Math.cos(pitch) - rz * Math.sin(pitch)
    const rz2 = y * Math.sin(pitch) + rz * Math.cos(pitch)
    const perspective = 1 + rz2 / (size * 4.8)
    verts.push([cx + rx * perspective, cy + ry * perspective, rz2])
  }
  const edges: [number, number][] = [[0,1],[0,2],[0,4],[1,3],[1,5],[2,3],[2,6],[3,7],[4,5],[4,6],[5,7],[6,7]]
  const faces = [[0,1,3,2],[4,5,7,6],[0,1,5,4],[2,3,7,6],[0,2,6,4],[1,3,7,5]]
  const faceOrder = faces.map(face => ({ face, depth: face.reduce((sum, idx) => sum + verts[idx][2], 0) / face.length })).sort((a,b) => a.depth - b.depth)
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  for (const {face,depth} of faceOrder) {
    ctx.beginPath(); ctx.moveTo(verts[face[0]][0], verts[face[0]][1])
    for (const idx of face.slice(1)) ctx.lineTo(verts[idx][0], verts[idx][1])
    ctx.closePath()
    const left = Math.min(...face.map(index => verts[index][0]))
    const right = Math.max(...face.map(index => verts[index][0]))
    const top = Math.min(...face.map(index => verts[index][1]))
    const bottom = Math.max(...face.map(index => verts[index][1]))
    const glass = ctx.createLinearGradient(left,top,right,bottom)
    if (depth > 0) {
      glass.addColorStop(0,'rgba(150,198,255,.98)')
      glass.addColorStop(.38,'rgba(48,116,232,.9)')
      glass.addColorStop(1,'rgba(13,42,126,.78)')
    } else {
      glass.addColorStop(0,'rgba(83,146,245,.78)')
      glass.addColorStop(1,'rgba(10,30,92,.64)')
    }
    ctx.shadowColor = 'rgba(42,118,235,.28)'
    ctx.shadowBlur = core ? 20 : 12
    ctx.fillStyle = glass
    ctx.globalCompositeOperation = 'source-over'
    ctx.fill()
    ctx.strokeStyle = depth > 0 ? 'rgba(187,219,255,.64)' : 'rgba(99,157,243,.42)'
    ctx.lineWidth = 1
    ctx.stroke()
  }
  ctx.shadowColor = core ? 'rgba(42,117,245,.76)' : 'rgba(38,97,210,.58)'
  ctx.shadowBlur = core ? 44 : 32
  ctx.lineWidth = core ? 2.8 : 2.1
  for (const [a,b] of edges) {
    ctx.beginPath(); ctx.moveTo(verts[a][0], verts[a][1]); ctx.lineTo(verts[b][0], verts[b][1])
    const front = (verts[a][2] + verts[b][2]) / 2 > 0
    ctx.strokeStyle = front ? 'rgba(224,240,255,1)' : 'rgba(112,174,255,.98)'
    ctx.stroke()
  }
  if (core) {
    ctx.shadowBlur = 22
    const pulse = .54 + (Math.sin(time * .002) + 1) * .13
    const g = ctx.createRadialGradient(cx-size*.08,cy-size*.08,1,cx,cy,size*.48)
    g.addColorStop(0,`rgba(157,199,255,${pulse})`); g.addColorStop(.34,'rgba(52,116,225,.62)'); g.addColorStop(1,'rgba(12,31,88,0)')
    ctx.fillStyle = g; ctx.fillRect(cx-size*.42,cy-size*.42,size*.84,size*.84)
    ctx.shadowBlur=8
    ctx.strokeStyle='rgba(120,148,255,.78)';ctx.lineWidth=.85
    for(const layer of [-.16,0,.16]){
      ctx.beginPath();ctx.moveTo(cx-size*.19,cy+size*layer);ctx.lineTo(cx+size*.19,cy+size*layer);ctx.stroke()
    }
    for(let row=-1;row<=1;row++)for(let column=-1;column<=1;column++){
      ctx.beginPath();ctx.arc(cx+column*size*.075,cy+row*size*.075,1.5,0,Math.PI*2);ctx.fillStyle='rgba(173,190,255,.95)';ctx.fill()
    }
  }
  ctx.restore()
}

export function HeroSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !ctx) return
    const context: CanvasRenderingContext2D = ctx

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = motionPreference.matches
    canvas.dataset.motion = reduced ? 'reduced' : 'animated'
    const cubes: Cube[] = [
      {x:.51,y:.5,startX:-.28,startY:-.24,size:.52,delay:.12,yaw:.32,phase:.2},
      {x:.41,y:.37,startX:-.15,startY:.16,size:.21,delay:.34,yaw:-.42,phase:1.1},
      {x:.41,y:.63,startX:.18,startY:.17,size:.19,delay:.56,yaw:.72,phase:2.4},
      {x:.66,y:.37,startX:.15,startY:-.18,size:.205,delay:.78,yaw:-.62,phase:3.6},
      {x:.66,y:.63,startX:.18,startY:.16,size:.19,delay:1.02,yaw:.54,phase:4.8},
    ]
    const nodes: Node[] = Array.from({length:28},(_,i)=>({
      x:.5+(seed(i+2)-.5)*.68, y:.5+(seed(i+24)-.5)*.62,
      radius:1.1+seed(i+50)*1.8, phase:seed(i+70)*Math.PI*2,
      orbit:.008+seed(i+94)*.026, speed:.00022+seed(i+112)*.00028,
    }))
    let width = 0, height = 0, dpr = 1, frame = 0, start = 0, visible = true, pointerX = 0, pointerY = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1,rect.width); height = Math.max(1,rect.height); dpr = Math.min(window.devicePixelRatio || 1,2)
      canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr)
      context.setTransform(dpr,0,0,dpr,0,0)
      if (reduced) draw(performance.now(),true)
    }
    const onPointer = (event: PointerEvent) => {
      const rect=canvas.getBoundingClientRect()
      pointerX=(event.clientX-rect.left)/rect.width-.5
      pointerY=(event.clientY-rect.top)/rect.height-.5
    }
    const onLeave = () => { pointerX=0; pointerY=0 }

    function draw(now: number, still = false) {
      if (!width || !height) return
      if (!start) start = now
      const elapsed = still ? 4000 : now-start
      context.clearRect(0,0,width,height)

      const centerX=width*.52, centerY=height*.51
      const scale=Math.min(width,height)
      const orbitW=width*.38, orbitH=height*.18
      context.save(); context.translate(centerX+pointerX*7,centerY+pointerY*6)
      context.beginPath(); context.ellipse(0,0,orbitW,orbitH,-.13,0,Math.PI*2)
      context.strokeStyle='rgba(58,83,194,.42)'; context.lineWidth=1.2; context.shadowColor='rgba(39,62,171,.42)'; context.shadowBlur=20; context.stroke()
      context.beginPath(); context.ellipse(0,0,orbitW*.78,orbitH*1.42,.45,0,Math.PI*2)
      context.strokeStyle='rgba(60,82,182,.32)'; context.shadowBlur=12; context.stroke()
      context.restore()

      const movingNodes=nodes.map((node,i)=>{
        const angle=node.phase+elapsed*node.speed
        return {x:(node.x+Math.cos(angle)*node.orbit)*width+pointerX*10,y:(node.y+Math.sin(angle*1.1)*node.orbit)*height+pointerY*9,r:node.radius,phase:node.phase+i}
      })
      const linksReady=Math.max(0,Math.min(1,(elapsed-560)/1300))
      for(let i=0;i<movingNodes.length;i++){
        let linked=0
        for(let j=i+1;j<movingNodes.length&&linked<4;j++){
          const a=movingNodes[i],b=movingNodes[j],dx=a.x-b.x,dy=a.y-b.y,distance=Math.hypot(dx,dy)
          if(distance<scale*.34){
            const proximity=1-distance/(scale*.34)
            const edgeAlpha=linksReady*(.27+proximity*.48)*(0.72+Math.sin(elapsed*.0018+i+j)*.28)
            context.beginPath();context.moveTo(a.x,a.y);context.lineTo(b.x,b.y)
            context.strokeStyle=`rgba(52,78,190,${edgeAlpha})`;context.lineWidth=.7+proximity*.45;context.stroke()
            const travel=(elapsed*.00013+(i*0.19+j*0.11))%1
            if(proximity>.48){
              context.beginPath();context.arc(a.x+dx*travel,a.y+dy*travel,1.2,0,Math.PI*2)
              context.fillStyle=`rgba(116,145,255,${edgeAlpha*1.8})`;context.shadowColor='rgba(53,80,190,.68)';context.shadowBlur=10;context.fill();context.shadowBlur=0
            }
            linked++
          }
        }
      }
      for(const node of movingNodes){
        const blink=.48+(.5+.5*Math.sin(elapsed*.0014+node.phase))*linksReady*.4
        context.beginPath();context.arc(node.x,node.y,node.r+1,0,Math.PI*2)
        context.fillStyle=`rgba(100,128,238,${blink*.68})`;context.shadowColor='rgba(57,82,197,.78)';context.shadowBlur=17;context.fill();context.shadowBlur=0
      }

      const cubePositions=cubes.map(cube=>{
        const p=Math.max(0,Math.min(1,(elapsed/1000-cube.delay)/1.45)),e=1-Math.pow(1-p,3)
        const x0=(cube.x+cube.startX)*width,y0=(cube.y+cube.startY)*height
        return {cube,x:x0+(cube.x*width-x0)*e,y:y0+(cube.y*height-y0)*e+Math.sin(elapsed*.0012+cube.phase)*2.4,size:scale*cube.size*(.75+.25*e),alpha:.12+.88*Math.min(1,e*1.35),e}
      })
      const core=cubePositions[0]
      for(const [index,satellite] of cubePositions.slice(1).entries()){
        const assembly=Math.max(0,Math.min(1,(elapsed-(satellite.cube.delay*1000+450))/1000))
        if(assembly<=0) continue
        const sx=satellite.x+pointerX*11,sy=satellite.y+pointerY*8,tx=core.x+pointerX*11,ty=core.y+pointerY*8
        const side=index%2===0?1:-1,curveY=(sy+ty)/2+side*scale*.11
        context.save();context.globalAlpha=assembly*.88;context.beginPath();context.moveTo(sx,sy);context.bezierCurveTo(sx+(tx-sx)*.35,curveY,tx-(tx-sx)*.35,curveY,tx,ty)
        context.strokeStyle='rgba(93,120,241,.96)';context.lineWidth=2;context.shadowColor='rgba(62,86,205,.9)';context.shadowBlur=27;context.stroke();context.restore()
        const travel=(elapsed*.00015+index*.23)%1,inv=1-travel
        const px=inv*inv*inv*sx+3*inv*inv*travel*(sx+(tx-sx)*.35)+3*inv*travel*travel*(tx-(tx-sx)*.35)+travel*travel*travel*tx
        const py=inv*inv*inv*sy+3*inv*inv*travel*curveY+3*inv*travel*travel*curveY+travel*travel*travel*ty
        context.beginPath();context.arc(px,py,2.1,0,Math.PI*2);context.fillStyle='rgba(139,162,255,.95)';context.shadowColor='rgba(64,94,209,.9)';context.shadowBlur=16;context.fill();context.shadowBlur=0
      }
      for(let i=0;i<cubes.length;i++){
        const part=cubePositions[i],cube=part.cube
        drawCube(context,part.x+pointerX*11,part.y+pointerY*8,part.size,elapsed,cube===cubes[0]?part.alpha:part.alpha,cube.yaw,cube===cubes[0])
      }
      const assembled=Math.max(0,Math.min(1,(elapsed-1650)/1300))
      if(assembled>0){
        context.save();context.globalAlpha=assembled*.7;context.beginPath();context.ellipse(centerX+pointerX*7,centerY+pointerY*6,scale*.305,scale*.118,-.13,0,Math.PI*2)
        context.strokeStyle='rgba(85,112,233,.88)';context.lineWidth=1.3;context.setLineDash([4,8]);context.lineDashOffset=-elapsed*.014;context.shadowColor='rgba(49,71,190,.88)';context.shadowBlur=18;context.stroke();context.restore()
      }
      if(!still&&visible&&!reduced) frame=requestAnimationFrame(draw)
    }
    const observer=new IntersectionObserver(([entry])=>{
      visible=entry.isIntersecting
      if(visible&&!reduced&&!frame) frame=requestAnimationFrame(draw)
      if(!visible&&frame){cancelAnimationFrame(frame);frame=0}
    },{threshold:.08})
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reduced = event.matches
      canvas.dataset.motion = reduced ? 'reduced' : 'animated'
      if (reduced) {
        if (frame) cancelAnimationFrame(frame)
        frame = 0
        draw(performance.now(), true)
      } else if (visible && !frame) {
        start = 0
        frame = requestAnimationFrame(draw)
      }
    }
    observer.observe(canvas)
    const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas)
    motionPreference.addEventListener('change',onMotionPreferenceChange)
    canvas.addEventListener('pointermove',onPointer);canvas.addEventListener('pointerleave',onLeave)
    resize()
    if(!reduced) frame=requestAnimationFrame(draw)
    return()=>{cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();motionPreference.removeEventListener('change',onMotionPreferenceChange);canvas.removeEventListener('pointermove',onPointer);canvas.removeEventListener('pointerleave',onLeave)}
  },[])

  return <canvas ref={canvasRef} className="hero-simulation" role="img" aria-label="An animated system assembles from glass-like computational cubes. Network connections emerge between nodes as the structure settles into a connected model-and-tools system." />
}
