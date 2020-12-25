module.exports = {
  name: "np",
  description: "Show now playing song",
  category: "music",
  run: (client, message, args) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        `${client.emotes.error} - You're not in a voice channel !`
      );

    if (!client.player.getQueue(message))
      return message.channel.send(
        `${client.emotes.error} - No music currently playing !`
      );

    const track = client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach(
      (filterName) => {
        if (client.player.getQueue(message).filters[filterName])
          filters.push(filterName);
      }
    );

    message.channel.send({
      embed: {
        color: "RED",
        author: { name: track.title },
        fields: [
          { name: "Channel", value: track.author, inline: true },
          {
            name: "Requested by",
            value: track.requestedBy.username,
            inline: true,
          },
          {
            name: "From playlist",
            value: track.fromPlaylist ? "Yes" : "No",
            inline: true,
          },

          { name: "Views", value: track.views, inline: true },
          { name: "Duration", value: track.duration, inline: true },
          { name: "Filters activated", value: filters.length, inline: true },

          {
            name: "Volume",
            value: client.player.getQueue(message).volume,
            inline: true,
          },
          {
            name: "Repeat mode",
            value: client.player.getQueue(message).repeatMode ? "Yes" : "No",
            inline: true,
          },
          {
            name: "Currently paused",
            value: client.player.getQueue(message).paused ? "Yes" : "No",
            inline: true,
          },

          {
            name: "Progress bar",
            value: client.player.createProgressBar(message, {
              timecodes: true,
            }),
            inline: true,
          },
        ],
        thumbnail: { url: track.thumbnail },
        timestamp: new Date(),
      },
    });
  },
};
