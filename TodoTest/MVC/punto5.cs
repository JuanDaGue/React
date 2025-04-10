using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace MostFrequentNumberApp
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            this.Text = "Encontrar el número más frecuente";
            this.Width = 500;
            this.Height = 400;
            this.StartPosition = FormStartPosition.CenterScreen;

            // Crear etiqueta para instrucciones
            Label lblInstructions = new Label
            {
                Text = "Ingresa un array de números (separados por comas):",
                Location = new System.Drawing.Point(20, 20),
                Width = 400
            };
            this.Controls.Add(lblInstructions);

            // Crear campo de texto para entrada
            TextBox txtInput = new TextBox
            {
                Location = new System.Drawing.Point(20, 50),
                Width = 440,
                Height = 25
            };
            this.Controls.Add(txtInput);

            // Crear botón para procesar
            Button btnFind = new Button
            {
                Text = "Encontrar número más frecuente",
                Location = new System.Drawing.Point(20, 90),
                Width = 250,
                Height = 30
            };
            this.Controls.Add(btnFind);

            // Panel para mostrar errores
            Panel errorPanel = new Panel
            {
                Location = new System.Drawing.Point(20, 140),
                Width = 440,
                Height = 60,
                Visible = false,
                BackColor = System.Drawing.Color.FromArgb(255, 240, 240)
            };
            
            Label lblError = new Label
            {
                Location = new System.Drawing.Point(10, 10),
                Width = 420,
                Height = 40,
                ForeColor = System.Drawing.Color.Red
            };
            errorPanel.Controls.Add(lblError);
            this.Controls.Add(errorPanel);

            // Panel para mostrar resultados
            Panel resultPanel = new Panel
            {
                Location = new System.Drawing.Point(20, 210),
                Width = 440,
                Height = 100,
                Visible = false,
                BackColor = System.Drawing.Color.FromArgb(240, 255, 240)
            };
            
            Label lblResultNumber = new Label
            {
                Location = new System.Drawing.Point(10, 10),
                Width = 420,
                Height = 30
            };
            
            Label lblResultExplanation = new Label
            {
                Location = new System.Drawing.Point(10, 50),
                Width = 420,
                Height = 30,
                Text = "Es el número que más se repite en el array."
            };
            
            resultPanel.Controls.Add(lblResultNumber);
            resultPanel.Controls.Add(lblResultExplanation);
            this.Controls.Add(resultPanel);

            // Evento del botón
            btnFind.Click += (sender, e) =>
            {
                errorPanel.Visible = false;
                resultPanel.Visible = false;

                try
                {
                    // Convertir la entrada en un array de números
                    string input = txtInput.Text;
                    if (string.IsNullOrWhiteSpace(input))
                    {
                        ShowError(errorPanel, lblError, "Por favor ingresa al menos un número");
                        return;
                    }

                    List<int> numbers = new List<int>();
                    
                    foreach (string item in input.Split(','))
                    {
                        string trimmed = item.Trim();
                        if (!string.IsNullOrEmpty(trimmed))
                        {
                            if (int.TryParse(trimmed, out int number))
                            {
                                numbers.Add(number);
                            }
                            else
                            {
                                ShowError(errorPanel, lblError, "Todos los valores deben ser números");
                                return;
                            }
                        }
                    }

                    if (numbers.Count == 0)
                    {
                        ShowError(errorPanel, lblError, "Por favor ingresa al menos un número");
                        return;
                    }

                    // Encontrar el número más frecuente
                    var result = FindMostFrequent(numbers);
                    
                    // Mostrar resultado
                    lblResultNumber.Text = $"El número {result.Number} aparece {result.Count} veces.";
                    resultPanel.Visible = true;
                }
                catch (Exception ex)
                {
                    ShowError(errorPanel, lblError, ex.Message);
                }
            };
        }

        private void ShowError(Panel panel, Label label, string message)
        {
            label.Text = message;
            panel.Visible = true;
        }

        private (int Number, int Count) FindMostFrequent(List<int> arr)
        {
            if (arr == null || arr.Count == 0)
                return (0, 0);

            // Usar LINQ para contar ocurrencias y encontrar el máximo
            var grouped = arr.GroupBy(n => n);
            var mostFrequent = grouped.OrderByDescending(g => g.Count()).First();
            
            return (mostFrequent.Key, mostFrequent.Count());
        }
    }

    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainForm());
        }
    }
}