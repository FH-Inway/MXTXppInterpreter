﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XppInterpreter.Interpreter.Bytecode
{
    class Push : IInstruction
    {
        object Value;
        public string OperationCode
        {
            get
            {
                if (Value is string) return $"PUSH \"{Value}\"";
                else return $"PUSH {Value}";
            }
        }

        public Push(object value)
        {
            Value = value;
        }

        public void Execute(RuntimeContext context)
        {
            context.Stack.Push(Value);
        }
    }
}