export function getMascotComments(soul) {
  if (soul >= 80) {
    return "😇 Your soul integrity is almost untouched... but how long can you resist the Friday deploy?";
  } else if (soul >= 50) {
    return "😈 Half-light, half-dark. Just like your Jira board: unresolved forever.";
  } else if (soul >= 20) {
    return "👹 Your soul is cracking... much like a CI pipeline on demo day.";
  } else {
    return "💀 Perfect! Your soul integrity is destroyed. Welcome to the Production Hell.";
  }
}
