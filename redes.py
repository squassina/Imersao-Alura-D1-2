# ==============================================================================
# MÓDULO DE CÁLCULOS DE REDES DE COMPUTADORES EM PYTHON
# Funções essenciais para estudantes de redes, telecomunicações e infraestrutura
# ==============================================================================

def calcular_subrede(ip_str: str, cidr: int) -> dict:
    """
    Calcula parâmetros essenciais de sub-rede IPv4 a partir de um IP e prefixo CIDR.
    Exemplo: calcular_subrede("192.168.1.100", 24)
    """
    if cidr < 1 or cidr > 32:
        return {"erro": "O prefixo CIDR deve estar entre 1 e 32."}

    octetos = [int(x) for x in ip_str.strip().split(".")]
    if len(octetos) != 4 or not all(0 <= o <= 255 for o in octetos):
        return {"erro": "Endereço IP inválido. Utilize o formato x.x.x.x (0 a 255)."}

    # Converte o IP para inteiro de 32 bits
    ip_int = (octetos[0] << 24) + (octetos[1] << 16) + (octetos[2] << 8) + octetos[3]

    # Máscara e Curinga (Wildcard)
    mascara_int = (0xFFFFFFFF << (32 - cidr)) & 0xFFFFFFFF
    wildcard_int = (~mascara_int) & 0xFFFFFFFF

    # Rede e Broadcast
    rede_int = ip_int & mascara_int
    broadcast_int = rede_int | wildcard_int

    def int_para_ip(val: int) -> str:
        return f"{(val >> 24) & 255}.{(val >> 16) & 255}.{(val >> 8) & 255}.{val & 255}"

    def int_para_binario(val: int) -> str:
        return ".".join(f"{(val >> (8 * i)) & 255:08b}" for i in range(3, -1, -1))

    total_ips = 2 ** (32 - cidr)
    hosts_uteis = 2 if cidr == 31 else (1 if cidr == 32 else max(0, total_ips - 2))

    primeiro_host = rede_int if cidr >= 31 else rede_int + 1
    ultimo_host = broadcast_int if cidr >= 31 else broadcast_int - 1

    return {
        "ip": ip_str,
        "cidr": f"/{cidr}",
        "mascara_decimal": int_para_ip(mascara_int),
        "mascara_binaria": int_para_binario(mascara_int),
        "wildcard": int_para_ip(wildcard_int),
        "endereco_rede": int_para_ip(rede_int),
        "endereco_broadcast": int_para_ip(broadcast_int),
        "primeiro_host": int_para_ip(primeiro_host),
        "ultimo_host": int_para_ip(ultimo_host),
        "total_ips": total_ips,
        "hosts_uteis": hosts_uteis,
    }


def tempo_download(tamanho_mb: float, velocidade_mbps: float) -> dict:
    """
    Calcula o tempo estimado para baixar um arquivo dada a velocidade da conexão.
    Lembrando que 1 Byte = 8 bits!
    """
    if tamanho_mb <= 0 or velocidade_mbps <= 0:
        return {"erro": "Tamanho e velocidade devem ser maiores que zero."}

    # Tamanho em bits (1 MB = 1.000.000 Bytes ou 8.000.000 bits)
    tamanho_bits = tamanho_mb * 8 * 1_000_000
    velocidade_bps = velocidade_mbps * 1_000_000

    total_segundos = tamanho_bits / velocidade_bps
    horas = int(total_segundos // 3600)
    minutos = int((total_segundos % 3600) // 60)
    segundos = int(total_segundos % 60)

    taxa_real_mbytes = velocidade_mbps / 8

    return {
        "segundos_totais": round(total_segundos, 2),
        "tempo_formatado": f"{f'{horas}h ' if horas > 0 else ''}{f'{minutos}m ' if minutos > 0 else ''}{segundos}s",
        "taxa_real_mb_s": round(taxa_real_mbytes, 2),
    }


def ip_para_binario(ip_str: str) -> str:
    """
    Converte um endereço IPv4 decimal (ex: '192.168.1.1') para formato binário de 32 bits pontuado.
    """
    octetos = [int(x) for x in ip_str.strip().split(".")]
    if len(octetos) != 4 or not all(0 <= o <= 255 for o in octetos):
        return "Erro: IP inválido."
    return ".".join(f"{o:08b}" for o in octetos)


def atraso_transmissao(tamanho_bytes: int, largura_banda_mbps: float) -> float:
    """
    Calcula o Atraso de Transmissão (L / R) de um pacote em milissegundos (ms).
    Fórmula de Redes de Computadores (Kurose & Ross).
    """
    if tamanho_bytes <= 0 or largura_banda_mbps <= 0:
        return 0.0

    l_bits = tamanho_bytes * 8
    r_bps = largura_banda_mbps * 1_000_000
    atraso_segundos = l_bits / r_bps
    return round(atraso_segundos * 1000, 4)  # retorna em milissegundos
