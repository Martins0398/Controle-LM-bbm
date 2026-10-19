import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = openpyxl.Workbook()

# Colors matching the image
NAVY_HEADER = "0F2E6B"
WHITE = "FFFFFF"
CORAL_RED = "DC2626"
GREEN_PLATE = "BBF7D0"
GREEN_ROW = "E6F7EF"
BORDER_COLOR = "CBD5E1"
DARK_TEXT = "0F172A"

thin_side = Side(border_style="thin", color=BORDER_COLOR)
table_border = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
header_border = Border(
    left=Side(border_style="thin", color="1E4A9E"),
    right=Side(border_style="thin", color="1E4A9E"),
    top=Side(border_style="thin", color="1E4A9E"),
    bottom=Side(border_style="medium", color="F97316")
)

# Sample rows for CD São Paulo (exact replica of user's photo)
data_sp = [
    ("1A", "PATRICIA DE CARVALHO SOUZA DOS ANJOS", "JDP0A37", "8", "JOÃO", "08:16", "08:42", "5583", "", False, False),
    ("1A", "ANTONIO SOUZA NETO", "APG3680", "11", "LUANA", "07:00", "07:45", "8774", "OK", False, False),
    ("1A", "JOÃO GILBERTO ALVES DA SILVA", "HDH5G43", "8", "JOÃO", "07:40", "08:07", "4557", "", True, False),
    ("2A", "MAICK DE SOUSA CAVALCANTE", "QNF6G09", "12", "NELSON", "07:22", "07:31", "785", "", True, False),
    ("2A/B", "BRUNO BORGES SADDE", "LLV1330", "12", "NELSON", "08:29", "08:47", "S/ISCA", "", False, False),
    ("2B", "LUCIO FLAVIO OLIVEIRA PIRES", "JHX5D08", "8", "JOÃO", "07:15", "07:24", "1851", "OK", True, False),
    ("3A", "WESLEY GOMES PEREIRA", "QIT1A48", "12", "NELSON", "10:04", "10:34", "400", "", True, False),
    ("3B", "NILTON OLIVEIRA COSTA", "JIV1456", "10", "LUANA", "08:35", "09:25", "9718", "", False, False),
    ("3C", "VAGNER SOUSA OLIVEIRA", "NLJ3A13", "10", "CARLOS", "08:53", "09:27", "9167", "", False, True),
    ("3D", "JOSÉ ARAUJO FREIRE", "JHH8E73", "11", "JULIA", "07:00", "07:28", "8742", "OK", False, False)
]

data_cwb = [
    ("CWB-01", "MARCOS VINICIUS RIBEIRO", "BCW4A21", "3", "RODRIGO", "06:45", "07:30", "3312", "OK", True, False),
    ("CWB-02", "EDSON SILVA SANTOS", "RHD8E99", "4", "RODRIGO", "08:10", "09:00", "7721", "", False, False),
    ("CWB-03", "ALEXANDRE PEREIRA LIMA", "BAE2C11", "5", "MARCOS", "07:30", "08:15", "1290", "OK", False, False)
]

data_rio = [
    ("RIO-01", "CARLOS EDUARDO MARTINS", "RIO2D19", "6", "MARCELO", "07:10", "08:05", "9912", "OK", True, False),
    ("RIO-02", "ROBERTO ALVES TEIXEIRA", "LSR9B44", "7", "MARCELO", "08:00", "08:50", "4411", "", False, False)
]

units = [
    ("CD São Paulo (Matriz)", data_sp),
    ("CD Curitiba (PR)", data_cwb),
    ("CD Rio de Janeiro (RJ)", data_rio)
]

# Remove default sheet
wb.remove(wb.active)

headers = ["ROTA", "MOTORISTA", "PLACA", "DOCA", "CONFERENTE", "INÍCIO", "FIM", "TEMPO (MIN)", "ISCA", "RETORNO ISCA"]

for unit_title, rows in units:
    sheet_name = unit_title.split("(")[0].strip()
    ws = wb.create_sheet(title=sheet_name)
    ws.views.sheetView[0].showGridLines = True
    
    # Title Banner (Row 1)
    ws.merge_cells("A1:J1")
    title_cell = ws["A1"]
    title_cell.value = f"BBM LOGÍSTICA | TRANSLOVATO | DIÁLOGO — {unit_title.upper()}"
    title_cell.font = Font(name="Segoe UI", size=11, bold=True, color=WHITE)
    title_cell.fill = PatternFill(start_color=NAVY_HEADER, end_color=NAVY_HEADER, fill_type="solid")
    title_cell.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[1].height = 30

    # Header Row (Row 2)
    ws.row_dimensions[2].height = 25
    for col_idx, header_text in enumerate(headers, 1):
        cell = ws.cell(row=2, column=col_idx, value=header_text)
        cell.font = Font(name="Segoe UI", size=10, bold=True, color=WHITE)
        cell.fill = PatternFill(start_color=NAVY_HEADER, end_color=NAVY_HEADER, fill_type="solid")
        cell.alignment = Alignment(horizontal="center" if header_text != "MOTORISTA" else "left", vertical="center")
        cell.border = header_border

    # Data Rows
    current_row = 3
    for r in rows:
        rota, motorista, placa, doca, conferente, inicio, fim, isca, retorno, placa_destaque, linha_destaque = r
        ws.row_dimensions[current_row].height = 22
        
        row_fill = PatternFill(start_color=GREEN_ROW, end_color=GREEN_ROW, fill_type="solid") if linha_destaque else None

        # ROTA
        c_rota = ws.cell(row=current_row, column=1, value=rota)
        c_rota.font = Font(name="Segoe UI", size=11, bold=True, color=DARK_TEXT)
        c_rota.alignment = Alignment(horizontal="center", vertical="center")
        
        # MOTORISTA
        c_mot = ws.cell(row=current_row, column=2, value=motorista)
        c_mot.font = Font(name="Segoe UI", size=10, bold=True, color=DARK_TEXT)
        c_mot.alignment = Alignment(horizontal="left", vertical="center")
        
        # PLACA
        c_placa = ws.cell(row=current_row, column=3, value=placa)
        c_placa.font = Font(name="Consolas", size=10, bold=True, color="14532D" if placa_destaque else DARK_TEXT)
        c_placa.alignment = Alignment(horizontal="center", vertical="center")
        if placa_destaque:
            c_placa.fill = PatternFill(start_color=GREEN_PLATE, end_color=GREEN_PLATE, fill_type="solid")
            
        # DOCA
        c_doca = ws.cell(row=current_row, column=4, value=doca)
        c_doca.font = Font(name="Segoe UI", size=11, bold=True, color=CORAL_RED)
        c_doca.alignment = Alignment(horizontal="center", vertical="center")
        
        # CONFERENTE
        c_conf = ws.cell(row=current_row, column=5, value=conferente)
        c_conf.font = Font(name="Segoe UI", size=10, bold=True, color=CORAL_RED)
        c_conf.alignment = Alignment(horizontal="center", vertical="center")
        
        # INICIO
        c_ini = ws.cell(row=current_row, column=6, value=inicio)
        c_ini.font = Font(name="Consolas", size=10, bold=True, color=CORAL_RED)
        c_ini.alignment = Alignment(horizontal="center", vertical="center")
        
        # FIM
        c_fim = ws.cell(row=current_row, column=7, value=fim)
        c_fim.font = Font(name="Consolas", size=10, bold=True, color=CORAL_RED)
        c_fim.alignment = Alignment(horizontal="center", vertical="center")
        
        # TEMPO FORMULA (Fim - Inicio)
        c_tempo = ws.cell(row=current_row, column=8)
        c_tempo.value = f'=IF(AND(F{current_row}<>"",G{current_row}<>""), ROUND((TIMEVALUE(G{current_row})-TIMEVALUE(F{current_row}))*1440, 0), "")'
        c_tempo.font = Font(name="Segoe UI", size=10, bold=True, color="15803D")
        c_tempo.alignment = Alignment(horizontal="center", vertical="center")
        
        # ISCA
        c_isca = ws.cell(row=current_row, column=9, value=isca)
        c_isca.font = Font(name="Consolas", size=10, bold=True, color=CORAL_RED)
        c_isca.alignment = Alignment(horizontal="center", vertical="center")
        
        # RETORNO ISCA
        c_ret = ws.cell(row=current_row, column=10, value=retorno if retorno else "PENDENTE")
        ret_is_ok = (retorno == "OK")
        c_ret.font = Font(name="Segoe UI", size=10, bold=True, color="15803D" if ret_is_ok else CORAL_RED)
        c_ret.alignment = Alignment(horizontal="center", vertical="center")

        # Apply borders and row highlight
        for col_idx in range(1, 11):
            cell = ws.cell(row=current_row, column=col_idx)
            cell.border = table_border
            if row_fill and not (col_idx == 3 and placa_destaque):
                cell.fill = row_fill

        current_row += 1

    # Auto-adjust column widths
    col_widths = {
        1: 10,   # ROTA
        2: 42,   # MOTORISTA
        3: 14,   # PLACA
        4: 10,   # DOCA
        5: 16,   # CONFERENTE
        6: 12,   # INICIO
        7: 12,   # FIM
        8: 15,   # TEMPO (MIN)
        9: 14,   # ISCA
        10: 16   # RETORNO ISCA
    }
    for col_idx, width in col_widths.items():
        col_letter = get_column_letter(col_idx)
        ws.column_dimensions[col_letter].width = width

out_path = r"C:\Users\Higor\.gemini\antigravity-ide\scratch\controle-docas-unidades\Controle_Docas_Por_Unidade.xlsx"
wb.save(out_path)
print("Planilha Excel criada com sucesso em:", out_path)
