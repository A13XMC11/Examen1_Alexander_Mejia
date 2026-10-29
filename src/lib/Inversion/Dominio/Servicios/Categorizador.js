function categorizar(capital, periodosAnuales) {
    if (periodosAnuales !== 12) return null;
    if (capital > 100 && capital <= 500) return 3;
    if (capital > 500 && capital <= 1000) return 2;
    if (capital > 1000) return 1;
    return null;
}

module.exports = { categorizar };