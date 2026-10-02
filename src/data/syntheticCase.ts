export const syntheticCase = {
  "schemaVersion": "1.0",
  "synthetic": true,
  "generatedFor": "EDP Control commercial UX specification",
  "date": "2026-10-01",
  "disclaimer": "Todos los nombres, documentos, firmas, importes y datos son ficticios. Hallazgos precargados para demostrar un flujo; no es un motor documental ni una aprobación.",
  "contractor": "Contratista Delta — ficticio",
  "project": "Proyecto Altura — ficticio",
  "edp": {
    "id": "EDP-02",
    "revision": "0",
    "issueDate": "2026-09-03",
    "fileName": "EDP_Agosto_2026.xlsx",
    "sheet": "EDP",
    "headerRow": 1,
    "periodStart": "2026-08-01",
    "periodEnd": "2026-08-31",
    "currency": "USD",
    "lines": [
      {
        "lineId": "01",
        "itemCode": "01",
        "xlsxRow": 2,
        "description": "Camioneta 4x4",
        "periodStart": "2026-08-01",
        "periodEnd": "2026-08-31",
        "quantityPeriod": 15,
        "unit": "día",
        "currency": "USD",
        "unitPrice": 120,
        "lineSubtotal": 1800,
        "sourceRefs": [
          "PART-08",
          "AD-01"
        ]
      },
      {
        "lineId": "02",
        "itemCode": "02",
        "xlsxRow": 3,
        "description": "Movimiento de suelo",
        "periodStart": "2026-08-01",
        "periodEnd": "2026-08-31",
        "quantityPeriod": 128,
        "unit": "m³",
        "currency": "USD",
        "unitPrice": 22,
        "lineSubtotal": 2816,
        "sourceRefs": [
          "ACT-08"
        ]
      },
      {
        "lineId": "03",
        "itemCode": "03",
        "xlsxRow": 4,
        "description": "Montaje de tablero de obra",
        "periodStart": "2026-08-01",
        "periodEnd": "2026-08-31",
        "quantityPeriod": 1,
        "unit": "hito",
        "currency": "USD",
        "unitPrice": 2400,
        "lineSubtotal": 2400,
        "sourceRefs": [
          "INF-03",
          "FOT-03",
          "IDX-08"
        ]
      },
      {
        "lineId": "04",
        "itemCode": "04",
        "xlsxRow": 5,
        "description": "Turno nocturno adicional",
        "periodStart": "2026-08-01",
        "periodEnd": "2026-08-31",
        "quantityPeriod": 2,
        "unit": "turno",
        "currency": "USD",
        "unitPrice": 300,
        "lineSubtotal": 600,
        "sourceRefs": [
          "SC-02"
        ]
      },
      {
        "lineId": "05",
        "itemCode": "05",
        "xlsxRow": 6,
        "description": "Supervisión de frente",
        "periodStart": "2026-08-01",
        "periodEnd": "2026-08-31",
        "quantityPeriod": 10,
        "unit": "día",
        "currency": "USD",
        "unitPrice": 180,
        "lineSubtotal": 1800,
        "sourceRefs": [
          "PART-08"
        ]
      },
      {
        "lineId": "06",
        "itemCode": "06",
        "xlsxRow": 7,
        "description": "Generador de apoyo",
        "periodStart": "2026-08-01",
        "periodEnd": "2026-08-31",
        "quantityPeriod": 10,
        "unit": "día",
        "currency": "USD",
        "unitPrice": 95,
        "lineSubtotal": 950,
        "sourceRefs": [
          "PART-08"
        ]
      },
      {
        "lineId": "07",
        "itemCode": "07",
        "xlsxRow": 8,
        "description": "Topografía de control",
        "periodStart": "2026-08-01",
        "periodEnd": "2026-08-31",
        "quantityPeriod": 2,
        "unit": "jornada",
        "currency": "USD",
        "unitPrice": 250,
        "lineSubtotal": 500,
        "sourceRefs": [
          "PART-08"
        ]
      },
      {
        "lineId": "08",
        "itemCode": "08",
        "xlsxRow": 9,
        "description": "Retiro de residuos de obra",
        "periodStart": "2026-08-01",
        "periodEnd": "2026-08-31",
        "quantityPeriod": 1,
        "unit": "mes",
        "currency": "USD",
        "unitPrice": 450,
        "lineSubtotal": 450,
        "sourceRefs": [
          "PART-08"
        ]
      }
    ],
    "subtotal": 11316
  },
  "documents": [
    {
      "id": "OS-2407",
      "name": "OS_2407.pdf",
      "kind": "service_order",
      "signedDate": "2026-07-20",
      "status": "signed",
      "sources": [
        {
          "ref": "Anexo A · p. 3",
          "excerpt": "Ítem 01 Camioneta 4x4: USD 120/día. Ítem 02 Movimiento de suelo: USD 22/m³. Ítem 03 Montaje de tablero: USD 2400/hito. Ítem 04 no incluido. Ítem 05 Supervisión: USD 180/día. Ítem 06 Generador: USD 95/día. Ítem 07 Topografía: USD 250/jornada. Ítem 08 Retiro de residuos: USD 450/mes."
        },
        {
          "ref": "Cláusula 6.1 · p. 4",
          "excerpt": "Las cantidades de cada período se presentan con el acta de avance aplicable al mismo ítem y período."
        },
        {
          "ref": "Cláusula 6.3 · p. 4",
          "excerpt": "El hito Montaje de tablero de obra se presenta con informe técnico, registro fotográfico y acta de aceptación del usuario técnico correspondiente al entregable."
        },
        {
          "ref": "Cláusula 8.2 · p. 5",
          "excerpt": "Los conceptos adicionales al alcance base se presentan con una modificación aprobada que identifique ítem, cantidad, precio y período aplicable."
        }
      ]
    },
    {
      "id": "AD-01",
      "name": "Adenda_01.pdf",
      "kind": "addendum",
      "signedDate": "2026-07-28",
      "effectiveFrom": "2026-08-01",
      "status": "signed",
      "itemCode": "01",
      "newPrice": 135,
      "oldPrice": 120,
      "currency": "USD",
      "unit": "día",
      "sources": [
        {
          "ref": "p. 1 · ítem 01",
          "excerpt": "Desde el 01/08/2026, la tarifa del ítem 01, Camioneta 4x4, pasa de USD 120 a USD 135 por día. Las demás condiciones de la OS-2407 permanecen sin cambios.",
          "highlight": [
            "Desde el 01/08/2026",
            "USD 135 por día"
          ]
        }
      ]
    },
    {
      "id": "ACT-08",
      "name": "Acta_Avance_Agosto.pdf",
      "kind": "progress_record",
      "date": "2026-09-02",
      "status": "approved_in_fiction",
      "itemCode": "02",
      "quantityPeriod": 112,
      "unit": "m³",
      "sources": [
        {
          "ref": "p. 1 · ítem 02",
          "excerpt": "Período 01/08/2026–31/08/2026. Ítem 02 — Movimiento de suelo: 112 m³ registrados y aprobados en esta acta.",
          "highlight": [
            "112 m³"
          ]
        }
      ]
    },
    {
      "id": "PART-08",
      "name": "Partes_Agosto.csv",
      "kind": "period_records",
      "date": "2026-08-31",
      "rows": [
        {
          "itemCode": "01",
          "quantityPeriod": 15
        },
        {
          "itemCode": "05",
          "quantityPeriod": 10
        },
        {
          "itemCode": "06",
          "quantityPeriod": 10
        },
        {
          "itemCode": "07",
          "quantityPeriod": 2
        },
        {
          "itemCode": "08",
          "quantityPeriod": 1
        }
      ]
    },
    {
      "id": "INF-03",
      "name": "Informe_Montaje.pdf",
      "kind": "technical_report",
      "date": "2026-08-31",
      "itemCode": "03",
      "status": "received",
      "sources": [
        {
          "ref": "p. 1",
          "excerpt": "Montaje del tablero de obra terminado. Este informe no es el acta de aceptación del usuario técnico."
        }
      ]
    },
    {
      "id": "FOT-03",
      "name": "Fotos_Montaje_01–04.jpg",
      "kind": "photos",
      "date": "2026-08-31",
      "itemCode": "03",
      "count": 4,
      "status": "received"
    },
    {
      "id": "SC-02",
      "name": "Solicitud_Cambio_02.pdf",
      "kind": "change_request",
      "date": "2026-08-25",
      "status": "draft",
      "approvalFoundInPackage": false,
      "itemCode": "04",
      "quantity": 2,
      "proposedPrice": 300,
      "sources": [
        {
          "ref": "p. 1",
          "excerpt": "Solicitud: dos turnos de inspección nocturna, tarifa propuesta USD 300 por turno. Estado: borrador. Aprobación: sin completar."
        }
      ]
    },
    {
      "id": "IDX-08",
      "name": "Indice_Respaldos_Agosto.csv",
      "kind": "evidence_index",
      "date": "2026-09-03",
      "entries": [
        {
          "itemCode": "03",
          "expected": "Informe técnico",
          "present": true,
          "documentIds": [
            "INF-03"
          ]
        },
        {
          "itemCode": "03",
          "expected": "Registro fotográfico",
          "present": true,
          "documentIds": [
            "FOT-03"
          ]
        },
        {
          "itemCode": "03",
          "expected": "Acta de aceptación del usuario técnico",
          "present": false,
          "documentIds": []
        },
        {
          "itemCode": "04",
          "expected": "Modificación aprobada",
          "present": false,
          "documentIds": [
            "SC-02"
          ]
        }
      ]
    }
  ],
  "preparedFindings": [
    {
      "id": "F-01",
      "lineId": "01",
      "kind": "price_difference",
      "title": "Precio distinto",
      "edpValue": "15 días × USD 120/día = USD 1.800",
      "sourceValue": "Adenda 01: USD 135/día desde 01/08/2026",
      "sourceRefs": [
        "AD-01"
      ],
      "reference": "Adenda 01 · p. 1 · ítem 01",
      "message": "El precio usado no coincide con la adenda.",
      "review": "Confirmar ítem y período y revisar si corresponde corregir el precio.",
      "arithmetic": {
        "unitPriceDifference": 15,
        "quantity": 15,
        "differenceAtSameQuantity": 225,
        "subtotalAtSourcePrice": 2025
      }
    },
    {
      "id": "F-02",
      "lineId": "02",
      "kind": "quantity_difference",
      "title": "Cantidad a revisar",
      "edpValue": "128 m³ × USD 22/m³ = USD 2.816",
      "sourceValue": "Acta del período: 112 m³",
      "sourceRefs": [
        "ACT-08",
        "OS-2407"
      ],
      "reference": "Acta ACT-08 · p. 1 · ítem 02; OS-2407 · cl. 6.1 · p. 4",
      "message": "Hay 16 m³ para revisar.",
      "review": "Buscar un acta complementaria, confirmar período o revisar la cantidad; no reducirla automáticamente.",
      "arithmetic": {
        "quantityDifference": 16,
        "unitPrice": 22,
        "amountAssociatedWithDifference": 352
      }
    },
    {
      "id": "F-03",
      "lineId": "03",
      "kind": "missing_document_in_package",
      "title": "Falta un respaldo",
      "edpValue": "Un hito de montaje terminado · USD 2.400",
      "sourceValue": "Informe + fotos + acta de aceptación; acta no encontrada en este paquete",
      "sourceRefs": [
        "OS-2407",
        "IDX-08",
        "INF-03",
        "FOT-03"
      ],
      "reference": "OS-2407 · cl. 6.3 · p. 4; índice IDX-08",
      "message": "No aparece el acta requerida en este paquete.",
      "review": "Buscar la versión aplicable o consultar cómo completar el respaldo.",
      "limitation": "No demuestra que el acta no exista o que el trabajo no haya sido aceptado."
    },
    {
      "id": "F-04",
      "lineId": "04",
      "kind": "human_confirmation_required",
      "title": "Adicional para consultar",
      "edpValue": "2 turnos nocturnos × USD 300 = USD 600",
      "sourceValue": "SC-02: borrador; aprobación no encontrada",
      "sourceRefs": [
        "OS-2407",
        "SC-02",
        "IDX-08"
      ],
      "reference": "SC-02 · p. 1; OS-2407 · cl. 8.2 · p. 5",
      "message": "No encontramos una modificación aprobada que respalde este adicional en los archivos disponibles.",
      "review": "Confirmar con Contratos cuál es la autorización vigente y si falta incluirla.",
      "limitation": "No demuestra ausencia de autorización en otro canal."
    }
  ],
  "coverage": {
    "lines": 8,
    "flaggedLines": 4,
    "noDifferencesInShownChecks": [
      "05",
      "06",
      "07",
      "08"
    ],
    "demonstrated": [
      "period_price_from_signed_addendum",
      "period_quantity_vs_progress_record",
      "presence_of_expected_document",
      "change_approval_not_found_in_package"
    ],
    "notDemonstrated": [
      "historical_accumulated_amounts",
      "taxes",
      "retentions",
      "advances",
      "discounts",
      "technical_acceptance_quality",
      "legal_interpretation",
      "invoice_authorization",
      "payment"
    ]
  },
  "uiRules": {
    "initialSelectedFinding": "F-01",
    "openingFindingDoesNotResolve": true,
    "noApprovalStatus": true,
    "noConfidenceScore": true,
    "missingSourceLabel": "No pudimos comprobar este control",
    "amountsAreNotApproved": true
  }
} as const
