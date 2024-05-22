﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XppInterpreter.Interpreter.Bytecode
{
    abstract class Call : IInstruction
    {
        public virtual string OperationCode => $"CALL {Name} {NArgs}" + (Alloc ? "(alloc)" : "(no alloc)");

        public string Name { get; }
        public int NArgs { get; }
        public bool Alloc { get; }
        public bool ProcessParameters { get; }

        public Call(string name, int nArgs, bool allocate, bool processParameters = true)
        {
            Name = name;
            NArgs = nArgs;
            Alloc = allocate;
            ProcessParameters = processParameters;
        }

        protected object[] GetParameters(RuntimeContext context)
        {
            object[] arguments = new object[NArgs];

            for (int narg = 0; narg < NArgs; narg++)
            {
                arguments[narg] = context.Stack.Pop();
            }

            return arguments;
        }

        public void Execute(RuntimeContext context)
        {
            object returnValue = null;

            if (ProcessParameters)
            {
                var arguments = GetParameters(context);
                returnValue = MakeCall(context, arguments);
            }
            else
            {
                returnValue = MakeCall(context, null);
            }

            if (Alloc)
                context.Stack.Push(returnValue);
        }

        public abstract object MakeCall(RuntimeContext context, object[] arguments);
    }
}