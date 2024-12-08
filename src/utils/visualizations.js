export const drawBars = (ctx, bufferLength, dataArray, canvas) => {
    const barWidth = (canvas.width / bufferLength) * 2.5
    let x = 0
  
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] / 2
      ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
      x += barWidth + 1
    }
  }
  
  export const drawCircularEqualizer = (ctx, bufferLength, dataArray, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 4
    ctx.lineCap = "round"
  
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) / 2 - 10
    const maxAmplitude = 256.0
  
    for (let i = 0; i < bufferLength / 2; i++) {
      const currentAngle = (i / (bufferLength / 2)) * Math.PI
      const normalizedAmplitude = dataArray[i] / maxAmplitude
      const amplitude = normalizedAmplitude * radius
  
      const x = centerX + amplitude * Math.cos(currentAngle)
      const y = centerY + amplitude * Math.sin(currentAngle)
  
      ctx.strokeStyle = `hsla(${
        (i / (bufferLength / 2)) * 180
      }, 100%, 50%, 0.8)`
  
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  
    for (let i = 0; i < bufferLength / 2; i++) {
      const currentAngle = (i / (bufferLength / 2)) * Math.PI + Math.PI
      const normalizedAmplitude = dataArray[i] / maxAmplitude
      const amplitude = normalizedAmplitude * radius
  
      const x = centerX + amplitude * Math.cos(currentAngle)
      const y = centerY + amplitude * Math.sin(currentAngle)
  
      ctx.strokeStyle = `hsla(${
        180 + (i / (bufferLength / 2)) * 180
      }, 100%, 50%, 0.8)`
  
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }
  
  export const drawRainbowBars = (dataArray, bars) => {
    bars.forEach((bar, index) => {
      const barHeight = dataArray[index] / 128
      const limitedHeight = Math.min(barHeight * 100, 200)
      bar.style.height = limitedHeight + "px"
    })
  }
  
  