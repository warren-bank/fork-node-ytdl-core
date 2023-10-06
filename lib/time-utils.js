const { parseTimestamp } = require('m3u8stream');

exports.parseTimestamp = parseTimestamp

exports.convertTimestampToByteOffset = (format, time) => {
  if (!format || !time) return 0

  // bits per second
  const bitrate = format.averageBitrate || format.bitrate
  if (!bitrate) return 0

  // convert string timestamp to number milliseconds
  time = parseTimestamp(time)
  // convert milliseconds to seconds
  time = time / 1000

  let byteOffset
  // units: (bits / sec)(sec)(bytes / bits) => bytes
  byteOffset = bitrate * time * (1 / 8)
  // round up to closest integer
  byteOffset = Math.ceil(byteOffset)

  return byteOffset
}
